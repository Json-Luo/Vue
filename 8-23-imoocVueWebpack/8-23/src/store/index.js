import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        text: 'first job'
      }
    ]
  },
  getters,
  actions,
  mutations
})
