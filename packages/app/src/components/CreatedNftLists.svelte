<script lang="ts">
  // @ts-nocheck
  import { downloadImage, getNft } from "../facades/database";
  import { nftId, nftList, openModal } from "../stores";

  // TODO
  // 購入までのストーリー
  // 購入済の場合復号化されたプロンプトが入って画像が表示される
  // 購入済でない場合はボタンが購入ボタンになるし、ジェネレートボタンがない
  // 購入済かどうかの判断は store の購入済みフラグをチェック
  // 購入したら購入済フラグをtrueにする
  // 購入ボタンをクリックしたら、鍵が発行されてDBに保存される←のむちん
  //
  // 購入済の時
  // DBから鍵をとってきてそのカギで復号してプロンプトを入力←のむちん
  // 今まで通り
  // モーダルの表示ができていない★大至急

  // NFT一覧
  let _nftList = [];
  nftList.subscribe((value) => {
    _nftList = value;
  });

  getNft()
    .then((x) => {
      // nftItem = {
      //   sourceTokenId: x.sourceTokenId,
      //   tokenId: x.tokenId,
      //   imagePath: "",
      // }
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
