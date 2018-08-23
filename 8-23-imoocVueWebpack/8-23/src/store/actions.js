import * as Types from './mutation-types';

export default {
  // 并不是 action 去操作 state，action 操作 mutations ，mutations 去操作 state
  addTodo({ commit }, todo) {
    commit(Types.ADDTODO, todo);
  },
  delTodo({ commit }, todo) {
    commit(Types.DELTODO, todo);
  }
}
