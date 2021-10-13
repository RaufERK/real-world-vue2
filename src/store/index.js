import Vue from 'vue'
import Vuex from 'vuex'
import EventServises from '../services/EventServises'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'avc1321', name: 'Rauf Erk' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
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
    createEvent({ commit }, event) {
      return EventServises.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    async fetchEvents({ commit }, { perPage, page }) {
      try {
        const { data, headers } = await EventServises.getEvents(perPage, page)
        // console.log('TOTAL===>', headers['x-total-count'])
        const totalEvents = headers['x-total-count']
        await commit('SET_EVENTS', { events: data, totalEvents })
      } catch (error) {
        console.log(error)
      }
    },
    async fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        await commit('SET_EVENT', event)
      } else {
        const { data } = await EventServises.getEvent(id)
        await commit('SET_EVENT', data)
      }
    },
  },
  getters: {
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
  },
  modules: {},
})
