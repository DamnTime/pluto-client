<template>
  <div class="home-container">
    <home-title />
    <div class="article-list-container">
      <article-item v-for="item in articleList" :key="item.id" :info="item" />
      <loading :has-more="hasMore" />
    </div>
  </div>
</template>

<script>
import { fetchArticles } from '@/api/home'
import reachBottom from '@/mixins/reachBottom'
export default {
  mixins: [reachBottom],
  async asyncData({ params, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    store.commit('navBar/UPDATE_CURRENTCATEGORY', params.category)
    const { list, totalPage, page } = await fetchArticles({
      categoryId: params.category,
    })
    return {
      articleList: list || [],
      hasMore: page < totalPage,
      page,
    }
  },
  data() {
    return {
      hasMore: true,
      isLoading: false,
    }
  },
  async fetchNextPage() {
    if (!this.hasMore) return
    if (this.isLoading) return
    const { category } = this.$route.params
    this.isLoading = true
    this.page += 1
    const { list, totalPage } = await fetchArticles({
      page: this.page,
      categoryId: category,
    })
    this.isLoading = false
    this.articleList = [...this.articleList, ...list]
    this.hasMore = this.page < totalPage
  },
  reachBottom() {
    this.fetchNextPage()
  },
}
</script>

<style lang="less" scoped>
.article-list-container {
  padding: 30px;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
}
</style>
