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
    [sepolia.id]: new ethers.providers.JsonRpcProvider("https://rpc.sepolia.org"),
    [taiko.id]: new ethers.providers.JsonRpcProvider("https://l2rpc.hackathon.taiko.xyz"),
    [foundry.id]: new ethers.providers.JsonRpcProvider("http://localhost:8545"),
  };
  const { chains, provider } = configureChains(
    [sepolia, taiko, foundry],
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

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >Flowbite</span
      >
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
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
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
        <li><a href="/signal-service">Signal service</a></li>
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
