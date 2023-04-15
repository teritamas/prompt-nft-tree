<script lang="ts">
  import { nftId, openModal } from "../stores";

  // 同じ変数名はつけられないらしい。
  // とりあえず変数名変えたけど、親コンポーネントのメソッド叩くように変更する
  function openModal3(value: number) {
    nftId.set(value); // storeに値を保存
    openModal.set(true); // storeに値を保存
  }
</script>

<nav class="nav">
  <ul>
    <li>
      <button type="button" class="img-object-fit-radius" on:click={() => openModal3(0)}>
        <img src="/images/web3tokyo.png" alt="" />
      </button>
      <ul>
        <li>
          <button type="button" class="img-object-fit-radius" on:click={() => openModal3(1)}>
            <img src="/images/web3tokyoglobal.png" alt="" />
          </button>
          <ul>
            <li>
              <button type="button" class="img-object-fit-radius" on:click={() => openModal3(2)}>
                <img src="/images/web3tokyoglobal2.png" alt="" />
              </button>
              <ul>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius"
                    on:click={() => openModal3(3)}
                  >
                    <img src="/images/web3tokyoglobalhappy2.png" alt="" />
                  </button>
                  <ul>
                    <li>
                      <button
                        type="button"
                        class="img-object-fit-radius"
                        on:click={() => openModal3(4)}
                      >
                        <img src="/images/web3tokyoglobalsuccess.png" alt="" />
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <button type="button" class="img-object-fit-radius" on:click={() => openModal3(5)}>
                <img src="/images/web3tokyoglobalprompt.png" alt="" />
              </button>
              <ul>
                <li>
                  <button
                    type="button"
                    class="img-object-fit-radius"
                    on:click={() => openModal3(6)}
                  >
                    <img src="/images/web3tokyoglobalprompt2.png" alt="" />
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <button type="button" class="img-object-fit-radius" on:click={() => openModal3(7)}>
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
          <button type="button" class="img-object-fit-radius" on:click={() => openModal3(8)}>
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
