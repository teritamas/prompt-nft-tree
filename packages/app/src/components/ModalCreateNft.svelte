<script lang="ts">
  import { generateAndUpdateNode } from "../facades/generativeAi";
  import { promptTreeNftABI, promptTreeNftAddress } from "../generated";
  import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
  import { foundry } from "@wagmi/core/chains";
  import { BigNumber } from "ethers";
  import {
    addNft,
    addNftToAccount,
    checkNftOwn,
    downloadImage,
    fileUpload,
    getLatestTokenId,
    incrementTokenId,
    addNftToAccountByTokenId,
    getNft
  } from "../facades/database";
  import { nftId, wagmiClient, openModal,nftList } from "../stores";
  import { decrypt, encrypt } from "../facades/authorization";
  import type { promptNft } from "../model/promptNft";
  import Loading from "./Loading.svelte";
  import Finished from "./Finished.svelte";

  let apiKey = "";
  let generativeImage: Blob;
  let loadingIsShow = false;
  let finishedIsShow = false;
  let defaultImageUrl = "";
  let positivePrompt = "";
  let id = 1;
  let isOwn = false;
  let walltaddress = "";
  let messageFromContract = "";
  let blockExplorerAddress = "";

  nftId.subscribe((value) => {
    id = value;
    blockExplorerAddress ="https://l2explorer.hackathon.taiko.xyz/token/" + promptTreeNftAddress[foundry.id] + "/instance/" + id
  });

  checkNftOwner();
  getLatestTokenId();
  downloadImage(id).then((x) => {
    defaultImageUrl = x;
  });

  function checkNftOwner(){
    wagmiClient.subscribe(async (value) => {
      const encryptedPrompt = await readEncryptPrompt();
      walltaddress = value.data?.account;
      const val = await checkNftOwn(walltaddress, id);

      if (val.length === 1) {
        isOwn = true;
        const decryptedPrompt = await decrypt(encryptedPrompt, val[0].encryptedSymmetricKey);
        positivePrompt = decryptedPrompt;
      } else {
        positivePrompt = "(Prompt Is Encrypted. Lets Purchase NFT.) " + encryptedPrompt;
      }
    });
  }

  async function readEncryptPrompt() {
    messageFromContract = "reset";
    const data = await readContract({
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "getEncryptedPrompt",
      args: [BigNumber.from(id)],
    });
    return data;
  }

  async function purchasedNft(){
    addNftToAccountByTokenId(walltaddress, id)
    .then(_=>{}).finally(_=>{
      checkNftOwner();
    });
  }

  async function mintNft() {
    loadingIsShow = true;
    // 1. 暗号化
    const { encryptedString, encryptedSymmetricKey } = await encrypt(positivePrompt);
    console.log("暗号化完了", encryptedString, encryptedSymmetricKey);

    getLatestTokenId().then(async (tokenId) => {
      // APIを叩きすぎると料金が嵩むので、ファイルをアップロード
      fileUpload(generativeImage, Number(tokenId));

      console.log("nftに変換します", encryptedString);
      const config = await prepareWriteContract({
        address: promptTreeNftAddress[foundry.id],
        abi: promptTreeNftABI,
        functionName: "mintNft",
        args: [promptTreeNftAddress[foundry.id], encryptedString.toString(), BigNumber.from(id)],
      });

      // トランザクションのリクエスト完了まで待つ
      await writeContract(config);

      await addNft(Number(tokenId), id, encryptedSymmetricKey).then(async (nft) => {
        await addNftToAccount(walltaddress, nft as promptNft);
        incrementTokenId().then((_) => {
          console.log("Increment Complete");
        });
      });
      closeModal()
    }).finally(_=>{
      loadingIsShow = false;
      getNft().then((_nftList) => {
        nftList.set(_nftList);
        _nftList.forEach(async (x) => {
          await getImg(x.tokenId, _nftList);
        });
      });
    });
  }

  async function getImg(tokenId, _nftList) {
    downloadImage(tokenId).then((x) => {
      _nftList.map((y) => {
        if (y.tokenId == tokenId) {
          y.imagePath = x;
        }
      });
      // @ts-ignore
      nftList.set(_nftList);
    });
  }

  async function generate() {
    loadingIsShow = true;
    generateAndUpdateNode(apiKey, positivePrompt)
      .then((response: { data: BlobPart }) => {
        const blob = new Blob([response.data], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = function () {
          URL.revokeObjectURL(url);
          const targetArea = document.getElementById("generativeImage")!;
          const currentImage = targetArea.firstChild;
          if (currentImage) {
            targetArea.removeChild(currentImage);
          }
          targetArea.appendChild(img);
        };
        img.src = url;
        generativeImage = blob;
      })
      .catch((error: any) => {
        console.error(error);
      }).finally(_=>{
        loadingIsShow = false;
      });
  }

  function closeModal() {
    openModal.set(false); // storeに値を保存
  }
  function closeFinished() {
    finishedIsShow = false;
  }
  // 同じ変数名はつけられないらしい。
  // とりあえず変数名変えたけど、親コンポーネントのメソッド叩くように変更する
  function openModal4(value: number) {
    nftId.set(value); // storeに値を保存
    openModal.set(true); // storeに値を保存
  }
</script>

<div
  id="extralarge-modal"
  tabindex="-1"
  class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  style="z-index: 1"
>
  <div class="relative w-full max-w-7xl max-h-full mx-auto">
    <!-- Modal content -->
    <div class="glass-modal relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-5 rounded-t dark:border-gray-600">
        <a href={blockExplorerAddress} class="text-blue-600 bg-white" target="_blank">Check this NFT on Block Explorer
        </a>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          on:click={() => closeModal()}
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="cols-2">
            <label
              for="message"
              class="block prompt-list-label mb-2 text-sm font-medium text-white dark:text-white"
              >Prompt</label
            >
            <textarea
              id="message"
              rows="3"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={positivePrompt}
            />
            <label
              for="message"
              class="block mt-4 mb-2 prompt-list-label text-sm font-medium text-white dark:text-white"
              >API KEY(<a 
                href="https://beta.dreamstudio.ai/account"
                class="text-blue-600 bg-white"
                target="_blank"
                >Created Account And Get API Key Here!</a
              >)</label
            >
            <input
              id="message"
              type="password"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={apiKey}
            />
            {#if !isOwn}
              <button
                type="button"
                class="text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
                >Generate Image</button
              >
            {/if}
            {#if isOwn}
              <button
                on:click={generate}
                type="button"
                class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
                >Generate Image</button
              >
            {/if}
          </div>
          <div id="generativeImage" class="cols-1">
            <!--復号化されたプロンプトが入って画像が表示される-->
            <img src={defaultImageUrl} alt="生成された画像" />
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        {#if !isOwn}
          <!--購入-->
          <button
            on:click={purchasedNft}
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Purchased NFT</button
          >
        {/if}
        {#if isOwn}
          <button
            on:click={mintNft}
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Create NFT</button
          >
        {/if}
        <button
          on:click={() => closeModal()}
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >Back</button
        >
      </div>
    </div>
  </div>
</div>
{#if loadingIsShow}
  <Loading />
{/if}
{#if finishedIsShow}
  <Finished {closeFinished} />
{/if}
