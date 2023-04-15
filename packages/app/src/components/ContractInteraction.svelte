<script lang="ts">
  // imports
  import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
  import { fooABI, promptTreeNftABI, promptTreeNftAddress } from "../generated";
  import { foundry } from "@wagmi/core/chains";
  import { BigNumber } from "ethers";
  import FirstViewTitle from "./FirstViewTitle.svelte";
  import FirstViewTree from "./FirstViewTree.svelte";
  import ModalCreateNft from "./ModalCreateNft.svelte";
  import CreatedNftLists from "./CreatedNftLists.svelte";
  import ModalBuyNft from "./ModalBuyNft.svelte";

  
  // variables
  let encryptedPrompt = "";
  let messageFromContract = "";
  let tokenId = "";

  import { nftId } from "../stores";
  let countValue;

  nftId.subscribe((value) => {
    countValue = value;
  });


  async function readMessage() {
    messageFromContract = "reset";
    const data = await readContract({
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "getEncryptedPrompt",
      args: [BigNumber.from(tokenId)],
    });
    console.log(data);
    messageFromContract = data;
  }
</script>

<!--
<section>Note: Must be connected to local foundry (anvil) network.</section>
<section>
  <input type="text" placeholder="ReadEncryptedPrompt" bind:value={encryptedPrompt} />
  <input type="submit" value="NftMint" on:click={mintNft} />
</section>
<section>
  <form>
    <input type="text" placeholder="Token Id" bind:value={tokenId} />
    <input type="submit" value="Get Read Encypted" on:click={readMessage} />
    <div style="text-align: center">Message from contract: {messageFromContract}</div>
  </form>
</section>-->

<div id="bg" />
<section id="body">
  <div class="">
    <div class="cols-2 grid grid-cols-1 md:grid-cols-3">
      <div class="col-span-2" style="margin: 0 auto;">
        <FirstViewTree />
      </div>
      <div>
        <FirstViewTitle />
      </div>
    </div>
    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
      <button
        type="button"
        class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >All categories</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Shoes</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Bags</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Electronics</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Gaming</button
      >
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <CreatedNftLists />
    </div>
    <!--modal-->
    <!--modalを二つのコンポーネントにわけないで、コンポーネント一個で条件分岐するほうがいい-->
    <ModalCreateNft />
    <ModalBuyNft />
    <!--modal-->
  </div>
</section>

