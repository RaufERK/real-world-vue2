import EventServises from '@/services/EventServises'

export default {
  namespaced: true,

  state: {
    totalEvents: null,
    events: [],
    event: {},
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, { events, totalEvents }) {
      state.events = events
      state.totalEvents = totalEvents
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },

  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventServises.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your rpoject has been crated',
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event :' + error,
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },

    async fetchEvents({ commit, dispatch }, { perPage, page }) {
      try {
        const { data, headers } = await EventServises.getEvents(perPage, page)
        // console.log('TOTAL===>', headers['x-total-count'])
        const totalEvents = headers['x-total-count']
        await commit('SET_EVENTS', { events: data, totalEvents })
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      }
    },

    async fetchEvent({ commit, getters, dispatch }, id) {
      try {
        const event = getters.getEventById(id)
        if (event) {
          await commit('SET_EVENT', event)
        } else {
          const { data } = await EventServises.getEvent(id)
          await commit('SET_EVENT', data)
        }
      } catch (error) {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      }
    },
  },

  getters: {
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
  },
}
