import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  totalCount: 0,
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_COUNT(state, count) {
    state.totalCount = count
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  // first parameter is the destructured context object
  createEvent({ commit, dispatch, rootState }, event) {
    // accessing property from another module via "rootState":
    console.log('User creating Event is ' + rootState.user.user.name)

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event:' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_TOTAL_COUNT', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        // action, payload, look for a notification/add action at the root of our store
        dispatch('notification/add', notification, { root: true })
      })
  },

  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
