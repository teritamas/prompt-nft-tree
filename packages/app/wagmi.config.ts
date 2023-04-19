import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";
import * as wagmiChains from "@wagmi/core/chains";
import { base, taiko } from "./src/domain/chain";
// TODO this is an error if the contract has not been deployed yet, please fix
import foundryJson from "../contracts/broadcast/Deploy.s.sol/31337/run-latest.json";

const chains = { ...wagmiChains, base, taiko };

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    // 外部のコントラクトをインポートする際に利用する
    // {
    //   name: "PromptTreeNFT",
    //   abi: promptTreeNftABI as Abi,
    //   address: {
    //     [chains.sepolia.id]: "0x11013a48Ad87a528D23CdA25D2C34D7dbDA6b46b",
    //     [chains.taiko.id]: "0x0000777700000000000000000000000000000007",
    //   },
    // },
  ],
  plugins: [
    foundry({
      deployments: {
        PromptTreeNFT: {
          [chains.foundry.id]: foundryJson.transactions[0].contractAddress as `0x${string}`,
        },
      },
      project: "../../",
    }),
  ],
});
