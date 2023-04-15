<script lang="ts">
  // @ts-nocheck
  import { downloadImage, getNft } from "../facades/database";
  import { nftId, nftList, wagmiClient } from "../stores";
  import { createAccount } from "../facades/database";
      
  let walltaddress = '';
  wagmiClient.subscribe(async (value)=>{
    walltaddress = value.data?.account;
    createAccount(walltaddress)
    .then(_=>console.log("アカウントチェック完了"));
  });
</script>

<h1
  class="mt-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
>
  Prompt NFT Tree
</h1>
<p class="py-8 px-5 text-lg font-normal text-white lg:text-xl">
  I will write the concept of prompt fishing here. I want to write something like raising prompts
  together
</p>
