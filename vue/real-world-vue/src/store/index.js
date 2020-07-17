import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education', 
      'food',
      'community',
      'nonsense',
      'bla'
    ],
    events: [],
    todos: [
      { id: 1, title: '...', done: true },
      { id: 2, title: '...', done: false },
      { id: 3, title: '...', done: true },
      { id: 4, title: '...', done: false }
    ]
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createEvent({commit}, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
      
    },
    fetchEvents({ commit }, { perPage , page}){
      EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
          console.log('There was an error:', error.response)
      })
    }
  },
  getters: {
    getCatLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done)
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})