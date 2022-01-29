<template>
  <div class="comment-list">
    <comment-item v-for="item in commentList" :key="item.id" :info="item" />
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.comment-list {
  margin-bottom: 20px;
}
</style>
