<script lang="ts">
  // @ts-nocheck
  import { downloadImage, getNft } from "../facades/database";
  import { nftId, nftList, openModal } from "../stores";

  // NFT一覧
  let _nftList = [];
  nftList.subscribe((value) => {
    _nftList = value;
  });

  getNft()
    .then((x) => {
      nftList.set(x);
      _nftList.forEach(async (x) => {
        await getImg(x.tokenId);
      });
    })
    .catch((e) => console.log(e));

  async function getImg(tokenId) {
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

  let id = 1;
  nftId.subscribe((value) => {
    id = value;
  });

  function openModal2(openId) {
    nftId.set(openId); // storeに値を保存
    openModal.set(true); // storeに値を保存
  }
</script>

{#each _nftList as item}
  <button type="button" on:click={() => openModal2(item.tokenId)}>
    <img class="h-auto max-w-full rounded-lg" src={item["imagePath"]} alt={item["title"]} />
  </button>
{/each}
