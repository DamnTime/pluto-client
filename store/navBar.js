import { fetchCates } from '@/api/home'

export const state = () => ({
  category: [],
  currentCate: '-1',
  articles: [],
})

export const mutations = {
  // 更新分类
  UPDATE_CATEGORY(state, payload) {
    state.category = payload
  },
  // 更新当前激活分类
  UPDATE_CURRENTCATEGORY(state, payload) {
    state.currentCate = `${payload}`
  },
  // 更新文章列表
  UPDATE_ARTICLES(state, payload) {
    state.articles = payload
  },
}

export const actions = {
  fetchCatesAction({ state, commit }, payload = {}) {
    if (state.category.length <= 0) {
      return fetchCates(payload).then((res) => {
        const result = res || []
        commit('UPDATE_CATEGORY', [{ id: '-1', name: '最新' }, ...result])
      })
    }
  },
  fetchArticles: ({ commit }, context) => {
    // Vue.$api.fetchArticleByCate(payload).then((res) => {
    //   commit('UPDATE_ARTICLES', res || [])
    // })
  },
}

export const getters = {
  currentCategory(state) {
    return state.currentCate
  },
  cates(state) {
    return state.category
  },
  articleList(state) {
    return state.articles
  },
}
