<script lang="ts">
  import { generateAndUpdateNode } from "../facades/generativeAi";
  import { promptTreeNftABI, promptTreeNftAddress } from "../generated";
  import { prepareWriteContract, writeContract } from "@wagmi/core";
  import { foundry } from "@wagmi/core/chains";
  import { BigNumber } from "ethers";
  import { addNft, addNftToAccount, checkNftOwn, fileUpload, getLatestTokenId, incrementTokenId } from "../facades/database";
  import { nftId,wagmiClient, openModal } from "../stores";
  import {encrypt } from "../facades/authorization";
  import type { promptNft } from "../model/promptNft";
  import Loading from "./Loading.svelte";
  import Finished from "./Finished.svelte";

  let apiKey = "";
  let generativeImage: Blob;
  let loadingIsShow = false;
  let finishedIsShow = false;
  let encryptedPrompt = "";
    
  let walltaddress = '';
  wagmiClient.subscribe(async (value)=>{
    walltaddress = value.data?.account;
    const val = await checkNftOwn(walltaddress, 19);
    console.log(val);

    if(val.length === 1){
      console.log(val[0]);
    }
    else {
      console.log("このNFTは保有してません！")
    }
  });

  getLatestTokenId()

  async function mintNft() {
    loadingIsShow = true;
    
    // 1. 暗号化
    const {encryptedString, encryptedSymmetricKey} = await encrypt(positivePrompt)
    console.log("暗号化完了", encryptedString, encryptedSymmetricKey);

    getLatestTokenId().then(async (tokenId)=>{
      // APIを叩きすぎると料金が嵩むので、ファイルをアップロード
      fileUpload(generativeImage, Number(tokenId));
      encryptedString.text().then(async x=>{
        encryptedPrompt = x
        console.log("nftに変換します", tokenId, encryptedPrompt)        
        const config = await prepareWriteContract({
          // TODO: encrypted
          address: promptTreeNftAddress[foundry.id],
          abi: promptTreeNftABI,
          functionName: "mintNft",
          args: [promptTreeNftAddress[foundry.id], encryptedPrompt, BigNumber.from(id)],
        });
        
        // トランザクションのリクエスト完了まで待つ
        setLoading(); // 仮置き、位置調整する
        await writeContract(config);

        addNft(Number(tokenId), id, encryptedSymmetricKey)
          .then(async nft=>{
            await addNftToAccount(walltaddress, nft as promptNft);
            console.log("increment Start")
            incrementTokenId().then(_=>{
              console.log("increment Complete")
            });
        });
      }).catch(e=>{
        console.error(e);
      });
    });
    // });
  }

  let id = 1;
  nftId.subscribe((value) => {
    id = value;
  });
  let positivePrompt = "";

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
        setLoading();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  function setLoading() {
    setTimeout(() => {
      loadingIsShow = false;
      finishedIsShow = true;
    }, 10000);
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
>
  <div class="relative w-full max-w-7xl max-h-full">
    <!-- Modal content -->
    <div class="glass-modal relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-5 rounded-t dark:border-gray-600">
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
              >API KEY(<a href="https://beta.dreamstudio.ai/generate" class="text-blue-600 bg-white"
                >Created Here!</a
              >)</label
            >
            <input
              id="message"
              type="password"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={apiKey}
            />
            <button
              on:click={generate}
              type="button"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
              >Generate Image</button
            >
          </div>
          <div id="generativeImage" class="cols-1">
            <!--復号化されたプロンプトが入って画像が表示される-->
            <!--<img src={_nftList[id]["imagePath"]} alt="生成された画像" />-->
          </div>
          <div class="cols-1">
            <h3 class="text-xl font-medium text-white">Prompt NFT Tree</h3>
            <nav class="nav">
              <ul>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius-modal"
                    on:click={() => openModal4(3)}
                  >
                    <img src="/images/web3tokyo.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        on:click={() => openModal4(3)}
                      >
                        <img src="/images/web3tokyoglobal.png" alt="" />
                      </button>
                      <ul>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius-modal"
                            on:click={() => openModal4(3)}
                          >
                            <img src="/images/web3tokyoglobal2.png" alt="" />
                          </button>
                          <ul>
                            <li>
                              <button
                                type="button"
                                class="img-object-fit-radius-modal"
                                on:click={() => openModal4(3)}
                              >
                                <img src="/images/web3tokyoglobalhappy2.png" alt="" />
                              </button>
                              <ul>
                                <li>
                                  <button
                                    type="button"
                                    class="img-object-fit-radius-modal"
                                    on:click={() => openModal4(3)}
                                  >
                                    <img src="/images/web3tokyoglobalsuccess.png" alt="" />
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius-modal"
                            on:click={() => openModal4(3)}
                          >
                            <img src="/images/web3tokyoglobalprompt.png" alt="" />
                          </button>
                          <ul>
                            <li>
                              <button
                                type="button"
                                class="img-object-fit-radius-modal"
                                on:click={() => openModal4(3)}
                              >
                                <img src="/images/web3tokyoglobalprompt2.png" alt="" />
                              </button>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        on:click={() => openModal4(3)}
                      >
                        <img src="/images/web3tokyoglobalhappy.png" alt="" />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        on:click={() => openModal4(3)}
                      >
                        <img src="/images/web3tokyoglobal3.png" alt="" />
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <!--ツリーのプレビュー-->
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        <button
          on:click={mintNft}
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Create NFT</button
        >
        <button
          on:click={() => closeModal()}
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >Decline</button
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
