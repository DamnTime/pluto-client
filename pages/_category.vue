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
import { fetchArticles } from '@/api/home'
import reachBottom from '@/mixins/reachBottom'

const pageSize = 6

export default {
  mixins: [reachBottom],
  async asyncData({ params, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    store.commit('navBar/UPDATE_CURRENTCATEGORY', params.category)
    const { list, totalPage, current } = await fetchArticles({
      categoryId: params.category,
      pageSize,
    })
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
      const { category } = this.$route.params
      this.isLoading = true
      this.current += 1
      const { list, totalPage } = await fetchArticles({
        current: this.current,
        categoryId: category,
        pageSize,
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
