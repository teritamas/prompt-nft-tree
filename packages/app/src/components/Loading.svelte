<div class="fullview">
  <div class="loaders">
    <div class="loader">
      <div class="text-center loader-inner line-scale-pulse-out">
        <div />
        <div />
        <div />
        <div />
        <div />
        <p class="font-bold text-white">Processing</p>
      </div>
    </div>
  </div>
</div>

<style scoped>
  .fullview {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .loader-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #059669;
    z-index: 100;
  }
  @-webkit-keyframes line-scale-pulse-out {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }
    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
  @keyframes line-scale-pulse-out {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    50% {
      -webkit-transform: scaley(0.4);
      transform: scaley(0.4);
    }
    100% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
  .line-scale-pulse-out > div {
    background-color: #059669;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
    animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
  }
  .line-scale-pulse-out > div:nth-child(2),
  .line-scale-pulse-out > div:nth-child(4) {
    -webkit-animation-delay: -0.4s !important;
    animation-delay: -0.4s !important;
  }
  .line-scale-pulse-out > div:nth-child(1),
  .line-scale-pulse-out > div:nth-child(5) {
    -webkit-animation-delay: -0.2s !important;
    animation-delay: -0.2s !important;
  }
  @-webkit-keyframes line-scale-pulse-out-rapid {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -webkit-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
  @keyframes line-scale-pulse-out-rapid {
    0% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
    80% {
      -webkit-transform: scaley(0.3);
      transform: scaley(0.3);
    }
    90% {
      -webkit-transform: scaley(1);
      transform: scaley(1);
    }
  }
</style>
