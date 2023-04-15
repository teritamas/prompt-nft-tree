<script>
  /**
   * @type {() => any}
   */
  export let closeFinished;
</script>

<div id="small-modal" tabindex="-1" class="fixed top-5 left-0 right-0 z-50 p-4">
  <div class="relative w-full max-w-md max-h-full mx-auto">
    <!-- Modal content -->
    <button on:click={() => closeFinished()} type="button">
      <div class="relative rounded-lg shadow bg-gray-700">
        <!-- Modal body -->
        <div class="p-6 grid grid-cols-4">
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
          <div class="col-span-3">
            <h3
              class="text-center text-5xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-2xl font-extrabold"
            >
              Success
            </h3>
            <div class="mt-2 text-base text-center text-white text-gray-500">
              Processing completed successfully!
            </div>
          </div>
        </div>
      </div>
    </button>
  </div>
</div>

<style type="text/css">
  .nav-icon {
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
