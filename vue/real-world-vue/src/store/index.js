import Vue from 'vue'
import Vuex from 'vuex'

import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
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
    todos: [
      { id: 1, title: '...', done: true },
      { id: 2, title: '...', done: false },
      { id: 3, title: '...', done: true },
      { id: 4, title: '...', done: false }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getCatLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done)
    }
  }
})
