<template functional>
  <div class="loading-wrapper">
    <div v-show="props.hasMore" class="spin-wrapper">
      <Spin fix>
        <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="5"
              stroke-miterlimit="10"
            ></circle>
          </svg>
        </div>
      </Spin>
    </div>
    <p v-show="!props.hasMore" class="no-more-txt">没有更多数据了...</p>
  </div>
</template>

<style lang="less" scoped>
.loading-wrapper {
  padding: 10px 0;
  .spin-wrapper {
    position: relative;
  }
  .no-more-txt {
    color: #999;
    text-align: center;
  }
  .loader {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }
  .circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      -webkit-animation: dash 1.5s ease-in-out infinite,
        color 6s ease-in-out infinite;
      animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
      stroke-linecap: round;
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
@keyframes color {
  0%,
  100% {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>
