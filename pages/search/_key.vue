<template>
  <div class="home-container">
    <home-title />
    <article-wrapper>
      <template v-slot:article>
        <article-item v-for="item in articleList" :key="item.id" :info="item" />
      </template>
      <template v-slot:hasMore>
        <loading :has-more="hasMore" />
      </template>
    </article-wrapper>
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
    const { list, totalPage, current } = response || {}
    return {
      articleList: list || [],
      hasMore: current < totalPage,
      current,
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
      this.current += 1
      const { list, totalPage } = await fetchArticleSearchList({
        current: this.current,
        key: decodeURIComponent(key),
      })
      this.isLoading = false
      this.articleList = [...this.articleList, ...list]
      this.hasMore = this.current < totalPage
    },
    reachBottom() {
      this.fetchNextPage()
    },
  },
}
</script>
