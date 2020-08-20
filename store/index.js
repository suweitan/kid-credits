export const state = () => ({
  currUser: null
})

export const mutations = {
  setUser(state, user) {
    state.currUser = { 
      displayName: user.displayName,
      email: user.email,
      refreshToken: user.refreshToken, 
      lastSignInTime: user.metadata ? user.metadata.lastSignInTime : null
    }
  },
  
  removeUser(state) {
    state.currUser = null 
  },
}