<script>
  // @ts-nocheck

  import { nftId } from "../stores";
  const nftLists = [
    {
      parentId: 1,
      title: "タイトル1",
      prompt: "tokyo",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobal",
    },
    {
      parentId: 1,
      title: "タイトル2",
      prompt: "tokyo love",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobal2",
    },
    {
      parentId: 1,
      title: "タイトル3",
      prompt: "tokyo happy",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalhappy2",
    },
    {
      parentId: 1,
      title: "タイトル4",
      prompt: "tokyo",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalsuccess",
    },
    {
      parentId: 1,
      title: "タイトル5",
      prompt: "tokyo love",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalprompt",
    },
    {
      parentId: 1,
      title: "タイトル6",
      prompt: "tokyo happy",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalprompt2",
    },
    {
      parentId: 1,
      title: "タイトル7",
      prompt: "tokyo love",
      negativePrompt: "web3tokyoglobalhappy web3",
      imagePath: "web3tokyoglobalhappy",
    },
    {
      parentId: 1,
      title: "タイトル8",
      prompt: "tokyo happy",
      negativePrompt: "web3tokyoglobal3 web3",
      imagePath: "web3tokyoglobal3",
    },
  ];

  let id = 1;
  nftId.subscribe((value) => {
    id = value;
  });
  function openModal(openId) {
    nftId.set(openId); // storeに値を保存
  }
</script>

{#each nftLists as item (item.id)}
  <div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      data-modal-target="extralarge-modal-buy"
      data-modal-toggle="extralarge-modal-buy"
      on:click={() => openModal(1)}
    >
      <img
        class="h-auto max-w-full rounded-lg"
        src="/images/{item['imagePath']}.png"
        alt={item["title"]}
      />
    </button>
  </div>
{/each}
