<script setup>
import { onMounted, reactive, ref } from "vue"
import db from "./db"

const inputUsername = ref("")
const inputMessage = ref("")
const state = reactive({
  username: "",
  messages: [],
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
  const messagesRef = db().ref("messages")

  if (inputMessage.value === "" || inputMessage.value === null) {
    return
  }

  const message = {
    username: state.username,
    content: inputMessage.value,
  }

  messagesRef.push(message)
  inputMessage.value = ""
}

onMounted(() => {
  const messagesRef = db().ref("messages")

  messagesRef.on("value", (snapshot) => {
    const data = snapshot.val()
    let messages = []

    Object.keys(data).forEach((key) => {
      messages.push({
        id: key,
        username: data[key].username,
        content: data[key].content,
      })
    })

    state.messages = messages
  })
})
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
        v-for="message in state.messages"
        :key="message.key"
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
