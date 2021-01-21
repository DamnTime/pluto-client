export const state = () => {
  return {
    userInfo: null,
  }
}

export const mutations = {
  // 更新用户信息
  UPDATE_USER_INFO(state, payload) {
    state.userInfo = payload
  },
}

export const getters = {
  userInfo(state) {
    return state.userInfo
  },
}
