<template>
  <div class="todos">
    this is Todos page
    <router-link to="/">Home</router-link>
    <router-link to="todos">Todos</router-link>
    <h1 class="todos-title">this is todos</h1>

    <input v-model="newtodo.text" type="text" @keydown.13="createTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text  }} <span @click="delTodo(todo)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data () {
      return {
        newtodo: {
          text: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'todos'
      ])
    },
    methods: {
      ...mapActions([
        'addTodo',
        'delTodo'
      ]),
      createTodo () {
        this.addTodo({
          ...this.newtodo
        });
        this.newtodo.text = '';
      }
    }
  }
</script>

<style scoped lang="less">
  .todos {
    &-title {
      font-size: 28px;
      color: rebeccapurple;
    }
  }
</style>
