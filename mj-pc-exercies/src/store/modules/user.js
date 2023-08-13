export default {
  namespaced: true, // 开启命名空间
  state: {
    token: localStorage.getItem('mj-pc-exercies-token')
  },
  mutations: {
    updateToken (state, newToken) {
      state.token = newToken
      localStorage.setItem('mj-pc-exercies-token', newToken)
    }
  }
}
