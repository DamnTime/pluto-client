<template>
  <div class="home-container">
    <home-title title="最新" />
    <div class="article-list-container">
      <article-item v-for="item in articleList" :key="item.id" :info="item" />
      <loading :has-more="hasMore" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { fetchArticlesLatest } from '@/api/home'
import reachBottom from '@/mixins/reachBottom'
export default {
  mixins: [reachBottom],
  async asyncData({ app, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    const result = await fetchArticlesLatest()
    const { list, totalPage, page } = result
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
  methods: {
    ...mapMutations(['UPDATE_CATEGORY']),
    async fetchNextPage() {
      if (!this.hasMore) return
      if (this.isLoading) return
      this.isLoading = true
      this.page += 1
      const { list, totalPage } = await fetchArticlesLatest({
        page: this.page,
      })
      this.isLoading = false
      this.articleList = [...this.articleList, ...list]
      this.hasMore = this.page < totalPage
    },
    reachBottom() {
      this.fetchNextPage()
    },
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
