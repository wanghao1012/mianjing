//
export default {
  namespaced: true, // 开启命名空间
  state: {
    // token: ''
    token: localStorage.getItem('mj-pc-token')
  },
  mutations: {
    upDateToken (state, newToken) {
      state.token = newToken
      localStorage.setItem('mj-pc-token', newToken)
    }
  }
}
