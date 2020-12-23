<template>
  <div class="article-item-wrapper" @click="handleClick">
    <div class="item-top">
      <p class="time">{{ info.publishTime }}</p>
      <h3 class="title">{{ info.title }}</h3>
      <p class="submessage">{{ info.subMessage }}</p>
    </div>
    <div class="item-bottom">
      <img :src="info.cover" class="cover-img" />
      <div class="tags">
        <pluto-tag
          v-for="tag in info.articleTags"
          :key="tag.id"
          :name="tag.name"
          :color="tag.color"
        ></pluto-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$router.push({ path: `/detail/${this.info.id}` })
    },
  },
}
</script>

<style lang="less" scoped>
.article-item-wrapper {
  height: 210px;
  box-shadow: 0 1px 2px hsla(0, 0%, 59%, 0.6);
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 30px;
  padding: 15px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  .time {
    color: #727272;
    font-size: 14px;
  }
  .title {
    color: #1f2d3d;
    font-weight: 400;
    font-size: 20px;
    min-height: 52px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .submessage {
    color: #666;
    line-height: 22px;
    max-height: 42px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .item-bottom {
    height: 52px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cover-img {
      width: 36px;
      height: 36px;
      border-radius: 20px;
    }
  }
}
</style>
