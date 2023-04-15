<script lang="ts">
  import { generateAndUpdateNode } from "../facades/generativeAi"
  import { promptTreeNftABI, promptTreeNftAddress } from "../generated";
  import { prepareWriteContract, writeContract } from "@wagmi/core";
  import { foundry } from "@wagmi/core/chains";
  import { BigNumber } from "ethers";
  import { nftId } from "../stores";

  let apiKey = "";

  const nftLists = {
    1: {
      parentId: 1,
      title: "タイトル1",
      prompt: "tokyo",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobal",
    },
    2: {
      parentId: 1,
      title: "タイトル2",
      prompt: "tokyo love",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobal2",
    },
    3: {
      parentId: 1,
      title: "タイトル3",
      prompt: "tokyo happy",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalhappy2",
    },
    4: {
      parentId: 1,
      title: "タイトル4",
      prompt: "tokyo",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalsuccess",
    },
    5: {
      parentId: 1,
      title: "タイトル5",
      prompt: "tokyo love",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalprompt",
    },
    6: {
      parentId: 1,
      title: "タイトル6",
      prompt: "tokyo happy",
      negativePrompt: "tokyo web3",
      imagePath: "web3tokyoglobalprompt2",
    },
    7: {
      parentId: 1,
      title: "タイトル7",
      prompt: "tokyo love",
      negativePrompt: "web3tokyoglobalhappy web3",
      imagePath: "web3tokyoglobalhappy",
    },
    8: {
      parentId: 1,
      title: "タイトル8",
      prompt: "tokyo happy",
      negativePrompt: "web3tokyoglobal3 web3",
      imagePath: "web3tokyoglobal3",
    },
  };

  let encryptedPrompt = "";
  // functions
  async function mintNft() {
    encryptedPrompt = positivePrompt;
    const config = await prepareWriteContract({
      // TODO: encrypted
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "mintNft",
      args: [promptTreeNftAddress[foundry.id], encryptedPrompt, BigNumber.from(id)],
    });
    await writeContract(config);
    console.log("Comcplete!");
  }

  let id = 1;
  nftId.subscribe((value) => {
    id = value;
  });
  let positivePrompt = "";

  async function generate() {
    await generateAndUpdateNode(
      apiKey,
      positivePrompt,
    )
  }
</script>

<div
  id="extralarge-modal"
  tabindex="-1"
  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
>
  <div class="relative w-full max-w-7xl max-h-full">
    <!-- Modal content -->
    <div class="glass-modal relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-medium text-white">{nftLists[id]["title"]}</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="extralarge-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <h3 class="text-white">NFT</h3>
        <p class="text-base text-white text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws
          for its citizens, companies around the world are updating their terms of service
          agreements to comply.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div class="cols-2">
            <label
              for="message"
              class="block prompt-list-label mt-4 mb-2 text-sm font-medium text-white dark:text-white"
              >Prompt</label
            >
            <textarea
              id="message"
              rows="3"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={positivePrompt}
            />
            <label
              for="message"
              class="block mt-4 mb-2 prompt-list-label text-sm font-medium text-white dark:text-white"
              >Negative Prompt</label
            >
            <textarea
              id="message"
              rows="3"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={nftLists[id]["negativePrompt"]}
            />
            <label
            for="message"
            class="block mt-4 mb-2 prompt-list-label text-sm font-medium text-white dark:text-white"
            >API KEY(<a href="https://beta.dreamstudio.ai/generate">Created Here!</a>)</label
            >
            <input
              id="message"
              type="password"
              class="block p-1 w-full text-sm glass text-white placeholder-white"
              bind:value={apiKey}
            />
            <button
            on:click={generate}
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
            >Generate Image</button
          >
          </div>
          <div id="generativeImage" class="cols-1">
            <img src="/images/{nftLists[id]['imagePath']}.png" alt="" />
          </div>
          <div class="cols-1">
            <h3 class="text-xl font-medium text-white">Prompt tree</h3>
            <nav class="nav">
              <ul>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius-modal"
                    data-modal-target="extralarge-modal"
                    data-modal-toggle="extralarge-modal"
                  >
                    <img src="/images/web3tokyo.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        data-modal-target="extralarge-modal"
                        data-modal-toggle="extralarge-modal"
                      >
                        <img src="/images/web3tokyoglobal.png" alt="" />
                      </button>
                      <ul>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius-modal"
                            data-modal-target="extralarge-modal"
                            data-modal-toggle="extralarge-modal"
                          >
                            <img src="/images/web3tokyoglobal2.png" alt="" />
                          </button>
                          <ul>
                            <li>
                              <button
                                type="button"
                                class="img-object-fit-radius-modal"
                                data-modal-target="extralarge-modal"
                                data-modal-toggle="extralarge-modal"
                              >
                                <img src="/images/web3tokyoglobalhappy2.png" alt="" />
                              </button>
                              <ul>
                                <li>
                                  <button
                                    type="button"
                                    class="img-object-fit-radius-modal"
                                    data-modal-target="extralarge-modal"
                                    data-modal-toggle="extralarge-modal"
                                  >
                                    <img src="/images/web3tokyoglobalsuccess.png" alt="" />
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius-modal"
                            data-modal-target="extralarge-modal"
                            data-modal-toggle="extralarge-modal"
                          >
                            <img src="/images/web3tokyoglobalprompt.png" alt="" />
                          </button>
                          <ul>
                            <li>
                              <button
                                type="button"
                                class="img-object-fit-radius-modal"
                                data-modal-target="extralarge-modal"
                                data-modal-toggle="extralarge-modal"
                              >
                                <img src="/images/web3tokyoglobalprompt2.png" alt="" />
                              </button>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        data-modal-target="extralarge-modal"
                        data-modal-toggle="extralarge-modal"
                      >
                        <img src="/images/web3tokyoglobalhappy.png" alt="" />
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius-modal"
                        data-modal-target="extralarge-modal"
                        data-modal-toggle="extralarge-modal"
                      >
                        <img src="/images/web3tokyoglobal3.png" alt="" />
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <!--ツリーのプレビュー-->
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        <button
          on:click={mintNft}
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Create NFT</button
        >
        <button
          data-modal-hide="extralarge-modal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >Decline</button
        >
      </div>
    </div>
  </div>
</div>
