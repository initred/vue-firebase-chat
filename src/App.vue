<script setup>
import { onMounted, reactive, ref } from "vue"
import useChat from "@/composables/useChat"

const { messages, setMessage, getMessages } = useChat()

const inputUsername = ref("")
const inputMessage = ref("")

const state = reactive({
  username: "",
})

function login() {
  if (inputUsername.value !== "" || inputUsername.value !== null) {
    state.username = inputUsername.value
    inputUsername.value = ""
  }
}

function logout() {
  state.username = ""
}

function sendMessage() {
  setMessage({
    username: state.username,
    content: inputMessage.value,
  })

  inputMessage.value = ""
}

onMounted(() => getMessages())
</script>

<template>
  <div v-if="state.username === '' || state.username === null">
    <form @submit.prevent="login">
      <h1>Login to Chat</h1>
      <label for="username">Username</label>
      <input
        v-model="inputUsername"
        type="text"
        placeholder="Enter your username"
      />
      <button type="submit">Login</button>
    </form>
  </div>

  <div v-else>
    <header>
      <button type="button" @click="logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section>
      <div
        v-for="message in messages"
        :key="message.id"
        :class="message.username === state.username ? 'current-user' : ''"
      >
        <div>{{ message.username }}: {{ message.content }}</div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="sendMessage">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="write a message"
        />
        <button type="submit">Send</button>
      </form>
    </footer>
  </div>
</template>
