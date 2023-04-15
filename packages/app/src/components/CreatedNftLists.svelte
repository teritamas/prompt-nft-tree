<script lang="ts">
  // @ts-nocheck
  import { downloadImage, getNft } from "../facades/database";
  import { nftId, nftList } from "../stores";
  
  // NFT一覧
  let _nftList = []
  nftList.subscribe((value) => {
    _nftList = value;
  });

  getNft().then(x =>{
    // nftItem = {
    //   sourceTokenId: x.sourceTokenId,
    //   tokenId: x.tokenId,
    //   imagePath: "",
    // }
    nftList.set(x)
    _nftList.forEach(async x=>{
      await getImg(x.tokenId)
    })
  }).catch(e=>console.log(e));


  async function getImg(tokenId){
    downloadImage(tokenId)
    .then(x=>{
      _nftList.map(y=>{
        if(y.tokenId== tokenId){
          y.imagePath = x
        }
      })
      // @ts-ignore
      nftList.set(_nftList)
    })
  }


  let id = 1;
  nftId.subscribe((value) => {
    id = value;
  });
  function openModal(openId) {
    console.log("openModal")
    nftId.set(openId); // storeに値を保存
  }
</script>

{#each _nftList as item}
  <div>
    <button
    type="button"
    data-modal-target="extralarge-modal"
    data-modal-toggle="extralarge-modal"
    on:click={() => openModal(item.tokenId)}
    >
      <img
        class="h-auto max-w-full rounded-lg"
        src={item["imagePath"]}
      />
    </button>
  </div>
{/each}
