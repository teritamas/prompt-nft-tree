<script lang="ts">
  //  import "@picocss/pico/css/pico.min.css";
  import "../global.css";
  import { taiko } from "../domain/chain";
  import { ethereumClient, wagmiClient, web3Modal, providers } from "../stores";
  import { configureChains, createClient } from "@wagmi/core";
  import { sepolia, foundry } from "@wagmi/core/chains";
  import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/html";
  import { ethers } from "ethers";
  import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

  $providers = {
    // [sepolia.id]: new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org"),
    [taiko.id]: new ethers.providers.JsonRpcProvider("https://l2rpc.hackathon.taiko.xyz"),
    [foundry.id]: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
  };
  const { chains, provider } = configureChains(
    // [sepolia, taiko, foundry],
    [taiko, foundry],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: $providers[chain.id].connection.url }),
      }),
    ]
  );

  // @ts-ignore
  $wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ chains, version: 1, projectId }),
    provider,
  });
  $ethereumClient = new EthereumClient($wagmiClient, chains);
  $web3Modal = new Web3Modal({ projectId, defaultChain: sepolia }, $ethereumClient);
</script>

<nav class="border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center">
      <svg class="nav-icon" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="gradient">
            <stop id="stop1" offset="0%" />
            <stop id="stop2" offset="100%" />
          </linearGradient>
        </defs>
        <g>
          <path
            d="M362.52,283.124c13.229,0.369,55.903-5.18,86.724-23.296c-61.625-29.739-119.02-104.774-119.02-104.774
            s30.673,4.197,69.838-16.82c-73.28-28.017-144.054-126.775-144.054-126.775s-70.772,98.758-144.07,126.775
            c39.181,21.017,69.854,16.82,69.854,16.82s-57.411,75.034-119.02,104.774c30.805,18.115,73.494,23.664,86.724,23.296
            C124.283,308.781,65.166,357.995,0,385.225c37.854,23.321,117.79,44.731,199.727,51.92l6.984,63.395h98.594l6.984-63.395
            c81.937-7.189,161.857-28.599,199.711-51.92C446.85,357.995,387.717,308.781,362.52,283.124z"
          />
        </g>
      </svg>

      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white"
        >Prompt NFT Tree</span
      >
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
        <li><w3m-network-switch /></li>
        <li>
          <w3m-core-button balance="show" icon="hide" />
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container">
  <slot />
</main>

<style type="text/css">
  .nav-icon {
    width: 35px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .nav-icon {
    fill: url(#gradient);
  }

  #stop1 {
    animation: stop1 5s ease-in-out infinite alternate;
  }
  #stop2 {
    animation: stop2 5s ease-in-out infinite alternate;
  }
  @keyframes stop1 {
    /* 紫から緑へ */
    0% {
      stop-color: #7a5fff;
    }
    100% {
      stop-color: #01ff89;
    }
  }
  @keyframes stop2 {
    /* 緑から紫へ */
    0% {
      stop-color: #01ff89;
    }
    100% {
      stop-color: #7a5fff;
    }
  }
</style>
