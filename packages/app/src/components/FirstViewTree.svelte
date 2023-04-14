<script lang="ts">
  import { nftId } from "../stores";

  function openModal(value: number) {
    nftId.set(value); // storeに値を保存
  }
</script>

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
            on:click={() => openModal(1)}
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
                on:click={() => openModal(2)}
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
                    on:click={() => openModal(3)}
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
                        on:click={() => openModal(4)}
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
                on:click={() => openModal(5)}
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
                    on:click={() => openModal(6)}
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
            on:click={() => openModal(7)}
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
            on:click={() => openModal(8)}
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
