export const state = () => ({
  title: '最新',
})

export const mutations = {
  // 更新title
  UPDATE_TITLE(state, payload) {
    state.title = payload
  },
}

export const getters = {
  currentTitle(state) {
    return state.title
  },
}
