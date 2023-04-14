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
    messageFromContract = "reset";
    const data = await readContract({
      address: promptTreeNftAddress[foundry.id],
      abi: promptTreeNftABI,
      functionName: "getEncryptedPrompt",
      args: [BigNumber.from(tokenId)],
    });
    console.log(data);
    messageFromContract = data;
  }
</script>

<!--
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
</section>-->

<div id="bg" />
<section id="body">
  <div class="grid grid-cols-1">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div>
        <nav class="nav">
          <ul>
            <li>
              <button
                type="button"
                class="img-object-fit-radius"
                data-modal-target="extralarge-modal"
                data-modal-toggle="extralarge-modal"
              >
                <img src="/images/web3tokyo.png" alt="" />
              </button>
              <ul>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius"
                    data-modal-target="extralarge-modal"
                    data-modal-toggle="extralarge-modal"
                  >
                    <img src="/images/web3tokyoglobal.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius"
                        data-modal-target="extralarge-modal"
                        data-modal-toggle="extralarge-modal"
                      >
                        <img src="/images/web3tokyoglobal2.png" alt="" />
                      </button>
                      <ul>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius"
                            data-modal-target="extralarge-modal"
                            data-modal-toggle="extralarge-modal"
                          >
                            <img src="/images/web3tokyoglobalhappy2.png" alt="" />
                          </button>
                          <ul>
                            <li>
                              <button
                                type="button"
                                class="img-object-fit-radius"
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
                        class="img-object-fit-radius"
                        data-modal-target="extralarge-modal"
                        data-modal-toggle="extralarge-modal"
                      >
                        <img src="/images/web3tokyoglobalprompt.png" alt="" />
                      </button>
                      <ul>
                        <li>
                          <button
                            type="button"
                            class="img-object-fit-radius"
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
                    class="img-object-fit-radius"
                    data-modal-target="extralarge-modal"
                    data-modal-toggle="extralarge-modal"
                  >
                    <img src="/images/web3tokyoglobalhappy.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <a href="#">grow</a>
                      <ul>
                        <li>
                          <a href="#">prompts</a>
                        </li>
                        <li>
                          <a href="#">tree</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius"
                    data-modal-target="extralarge-modal"
                    data-modal-toggle="extralarge-modal"
                  >
                    <img src="/images/web3tokyoglobal3.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <a href="#">with</a>
                    </li>
                    <li>
                      <a href="#">you</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <h1
          class="mt-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >
          Prompt Tree
        </h1>
        <p class="py-8 px-5 text-lg font-normal text-white lg:text-xl">
          I will write the concept of prompt fishing here. I want to write something like raising
          prompts together
        </p>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <button
          type="button"
          class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          >All categories</button
        >
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >Shoes</button
        >
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >Bags</button
        >
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >Electronics</button
        >
        <button
          type="button"
          class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >Gaming</button
        >
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>

  <!--modal-->
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
          <h3 class="text-xl font-medium text-white">image title</h3>
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
              />
            </div>
            <div class="cols-1">
              <img src="/images/web3tokyoglobal3.png" alt="" />
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
            data-modal-hide="extralarge-modal"
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Make NFT</button
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
  <!--モーダル終わり-->
</section>

<style>
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  * {
    -webkit-transition: all ease 0.4s;
    -moz-transition: all ease 0.4s;
    transition: all ease 0.4s;
  }

  html,
  body {
    width: 100%;
    height: 100%;

    font-family: "Fjalla One", sans-serif;
    font-size: 18px;
  }

  #bg {
    position: fixed;
    /*top: 0;*/
    left: 0;
    width: 100%;
    height: 100%;
  }

  #body {
    position: absolute;
    /*top: 0;*/
    left: 0;
    padding: 5rem;
  }

  h1 {
    text-align: center;
  }

  .nav {
    margin: 20px auto;
    width: 455px;
    min-height: auto;
  }

  .nav ul {
    position: relative;
    padding-top: 20px;
  }

  .nav li {
    position: relative;
    padding: 20px 3px 0 3px;
    float: left;

    text-align: center;
    list-style-type: none;
  }

  .nav li::before,
  .nav li::after {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    width: 50%;
    height: 20px;
    border-top: 1px solid #ccc;
  }

  .nav li::after {
    left: 50%;
    right: auto;

    border-left: 1px solid #ccc;
  }

  .nav li:only-child::after,
  .nav li:only-child::before {
    content: "";
    display: none;
  }

  .nav li:only-child {
    padding-top: 0;
  }
  .nav li:first-child::before,
  .nav li:last-child::after {
    border: 0 none;
  }

  .nav li:last-child::before {
    border-right: 1px solid #ccc;
    border-radius: 0 5px 0 0;
  }

  .nav li:first-child::after {
    border-radius: 5px 0 0 0;
  }
  .nav ul ul::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    border-left: 1px solid #ccc;
    width: 0;
    height: 20px;
  }

  .nav li a {
    display: inline-block;
    padding: 5px 10px;

    border-radius: 5px;
    border: 1px solid #ccc;

    text-decoration: none;
    text-transform: uppercase;
    color: #ccc;
    font-family: arial, verdana, tahoma;
    font-size: 11px;
  }

  .nav li a:hover,
  .nav li a:hover + ul li a {
    color: #000;
    background: #c8e4f8;
    border: 1px solid #94a0b4;
  }

  .nav li a:hover + ul li::after,
  .nav li a:hover + ul li::before,
  .nav li a:hover + ul::before,
  .nav li a:hover + ul ul::before {
    content: "";
    border-color: #94a0b4;
  }

  .img-object-fit-radius {
    padding: 0 !important;
  }
  .img-object-fit-radius img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
  }

  .img-object-fit-radius img:hover {
    transform: scale(2, 2);
    z-index: 10;
  }

  .img-object-fit-radius-modal {
    padding: 0 !important;
  }
  .img-object-fit-radius-modal img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
  }

  .glass-modal {
    width: 100%;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.1); /* 背景色 */
    border: 1px solid rgba(255, 255, 255, 0.4); /* ボーダー */
    border-right-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    -webkit-backdrop-filter: blur(20px); /* ぼかしエフェクト */
    backdrop-filter: blur(20px);
  }

  /* ガラス本体 */
  .glass {
    width: 100%;
    max-width: 600px;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.1); /* 背景色 */
    border: 1px solid rgba(255, 255, 255, 0.4); /* ボーダー */
    border-right-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    -webkit-backdrop-filter: blur(20px); /* ぼかしエフェクト */
    backdrop-filter: blur(20px);
  }

  .prompt-list-label:before {
    content: "●";
    color: rgba(63, 131, 248, 0.5);
    padding-right: 0.5rem;
  }
</style>
