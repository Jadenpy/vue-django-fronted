<template>
  <div>
    <h1>待办事项</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="输入新任务" />
      <button type="submit">添加</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }}
          </span>
        </label>
        <button @click="deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      todos: [],
      newTodo: '',
    }
  },
  mounted() {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos() {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/api/todos/`)
      this.todos = res.data
    },
    async addTodo() {
      const res = await axios.post(`${process.env.VUE_APP_API_URL}/api/todos/`, {
        title: this.newTodo,
        completed: false,
      })
      this.todos.push(res.data)
      this.newTodo = ''
    },
    async updateTodo(todo) {
      await axios.put(`${process.env.VUE_APP_API_URL}/api/todos/${todo.id}/`, todo)
    },
    async deleteTodo(id) {
      await axios.delete(`${process.env.VUE_APP_API_URL}/api/todos/${id}/`)
      this.todos = this.todos.filter((t) => t.id !== id)
    },
  },
}
</script>

<style scoped>
input[type='text'] {
  padding: 5px;
  margin-right: 10px;
}
</style>
