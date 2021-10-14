export default {
  namespaced: true,
  state: {
    // notifications: [{ type: 'info', message: 'test', id: 'erwerw' }],
    notifications: [],
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: String(Math.random()),
      })
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id
      )
    },
  },
  actions: {
    add({ commit }, notification) {
      commit('PUSH', notification)
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove)
    },
  },
}
