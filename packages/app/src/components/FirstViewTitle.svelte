<script lang="ts">
  // @ts-nocheck
  import { downloadImage, getNft } from "../facades/database";
  import { nftId, nftList, wagmiClient } from "../stores";
  import { createAccount } from "../facades/database";

  let walltaddress = "";
  wagmiClient.subscribe(async (value) => {
    walltaddress = value.data?.account;
    createAccount(walltaddress).then((_) => console.log("アカウントチェック完了"));
  });
</script>

<h1
  class="mt-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
>
  Prompt NFT Tree
</h1>
<p class="py-8 px-5 font-normal text-white lg:text-md">
  Prompt NFT Tree is a service that makes the prompt to be grown with everyone. Making NFT from AI
  prompts. Rewards are paid to developers each time the prompt is reused. Create an NFT with LIT
  encryption technology. That is able to Hold the prompt more safety. Tracing the prompt's purchase
  history with blockchain technology. That makes us to watch the prompt's growth.
</p>
