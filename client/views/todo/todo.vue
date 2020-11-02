<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做的事情?"
      @keyup.enter="addTodo"
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key = "todo.id"
      @del = "deleteTodo"
    ></item>
    <tabs
      :filter="filter"
      :todos = "todos"
      @toggle = "toggleFilter"
      @clearAll = "clearAllCompleted"
    ></tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0

export default {
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }

      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(), // trim去空格
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }

  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position relative
  height 70px
  width 600px
  font-size 24px
  padding 0 20px
  box-sizing border-box
  border-width 0 0 1px 0
}
</style>
