<script lang="ts">
  // imports
  import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
  import { fooABI, promptTreeNftABI, promptTreeNftAddress } from "../generated";
  import { foundry } from "@wagmi/core/chains";
    import { BigNumber } from "ethers";
  // variables
  let encryptedPrompt = "";
  let messageFromContract = "";
  let tokenId = "";
  
  // functions
  async function mintNft() {
    const config = await prepareWriteContract({
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "mintNft",
      args: [promptTreeNftAddress[foundry.id], encryptedPrompt, BigNumber.from(0)],
    });
    await writeContract(config);
    console.log("Complete!");
  }

  async function readMessage() {
    messageFromContract = "reset"
    const data = await readContract({
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "getEncryptedPrompt",
      args: [BigNumber.from(tokenId)]
    });
    console.log(data);
    messageFromContract = data;
  }
</script>

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
</section>
