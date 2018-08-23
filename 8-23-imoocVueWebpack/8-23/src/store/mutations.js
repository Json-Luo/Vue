import * as Types from './mutation-types';

let idStart = 1;

export default {
  [Types.ADDTODO] (state, todo) {
    if (!todo.id) {
      todo.id = ++idStart;
    }
    state.todos.push(todo);
  },
  [Types.DELTODO] (state, todo) {
    state.todos.forEach((item, index) => {
      if (item.id === todo.id) {
        state.todos.splice(index, 1);
      }
    })
  }
}
