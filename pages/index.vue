<template>
  <div class="home-container">
    <home-title title="最新" />
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
import { mapMutations } from 'vuex'
import { fetchArticlesLatest } from '@/api/home'
import reachBottom from '@/mixins/reachBottom'
export default {
  mixins: [reachBottom],
  async asyncData({ app, store }) {
    await store.dispatch('navBar/fetchCatesAction')
    store.commit('navBar/UPDATE_CURRENTCATEGORY', '-1')
    const result = await fetchArticlesLatest()
    const { list, totalPage, current } = result
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
    ...mapMutations(['UPDATE_CATEGORY']),
    async fetchNextPage() {
      if (!this.hasMore) return
      if (this.isLoading) return
      this.isLoading = true
      this.current += 1
      const { list, totalPage } = await fetchArticlesLatest({
        current: this.current,
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
