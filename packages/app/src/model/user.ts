import type { promptNft } from "./promptNft";

export interface User {
  walletAddress: string;
  ownNfts: promptNft[];
}
