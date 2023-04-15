<script lang="ts">
  // imports
  import FirstViewTitle from "./FirstViewTitle.svelte";
  import FirstViewTree from "./FirstViewTree.svelte";
  import ModalCreateNft from "./ModalCreateNft.svelte";
  import CreatedNftLists from "./CreatedNftLists.svelte";

  import { nftId } from "../stores";
  import { openModal } from "../stores";
  let countValue;

  nftId.subscribe((value) => {
    countValue = value;
  });

  let openModalFlag = false;
  openModal.subscribe((value) => {
    openModalFlag = value;
  });
</script>

<div id="bg" />
<section id="body" class="p-1 md:p-5rem">
  <div class="">
    <div class="cols-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div class="col-span-2" style="margin: 0 auto;">
        <FirstViewTree />
      </div>
      <div class="col-span-2" style="display:block; align-items: flex-end;">
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
        >Person</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Landscapes</button
      >
      <button
        type="button"
        class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >Cultures</button
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
    {#if openModalFlag}
      <ModalCreateNft />
    {/if}
  </div>
</section>
