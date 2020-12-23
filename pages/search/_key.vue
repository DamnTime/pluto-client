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
import { fetchArticleSearchList } from '@/api/home'
import reachBottom from '@/mixins/reachBottom'
import { fixedEncodeURIComponent } from '@/utils'

export default {
  mixins: [reachBottom],
  async asyncData({ params, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    const response = await fetchArticleSearchList({
      title: decodeURIComponent(fixedEncodeURIComponent(params.key)),
    })
    const { list, totalPage, page } = response || {}
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
    async fetchNextPage() {
      if (!this.hasMore) return
      if (this.isLoading) return
      const { key } = this.$route.query
      this.isLoading = true
      this.page += 1
      const { list, totalPage } = await fetchArticleSearchList({
        page: this.page,
        key: decodeURIComponent(key),
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
