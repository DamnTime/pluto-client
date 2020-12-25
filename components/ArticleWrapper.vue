<template functional>
  <div class="article-list-container">
    <div class="article-list-wrapper">
      <slot name="article"></slot>
    </div>
    <slot name="hasMore"></slot>
  </div>
</template>

<style lang="less" scoped>
.article-list-container {
  padding: 30px;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  min-height: 220px;
  .article-list-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
