<template functional>
  <span class="tag-container" :style="{ background: props.color }">
    {{ props.name }}
  </span>
</template>

<style lang="less" scoped>
.tag-container {
  padding: 4px 8px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  margin: 2px 4px 2px 0;
  &:last-of-type {
    margin-right: 0;
  }
}
</style>
