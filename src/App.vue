<script setup>
import { onMounted, reactive, ref } from "vue"
import useChat from "@/composables/useChat"

const { chat, messages, setMessage, getMessages } = useChat()

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

onMounted(() => {
  getMessages()
})
</script>

<template>
  <div
    v-if="state.username === '' || state.username === null"
    :class="['w-full h-screen flex items-center justify-center', 'bg-rose-500']"
  >
    <form
      class="max-w-sm w-full bg-white rounded shadow-lg p-6 space-y-6 mx-4"
      @submit.prevent="login"
    >
      <h1 class="text-lg font-bold text-gray-800">What's Your Name?</h1>
      <div class="flex flex-col">
        <label for="username" class="text-sm text-gray-500">Username</label>
        <div class="mt-1">
          <input
            id="username"
            v-model="inputUsername"
            class="w-full border border-gray-300 rounded text-sm"
            type="text"
            placeholder="Enter your username"
            autofocus
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full py-2.5 text-sm text-white bg-rose-500 font-medium rounded"
      >
        Enter
      </button>
    </form>
  </div>

  <div v-else class="w-full h-screen bg-rose-500 divide-y">
    <header class="h-24 p-4">
      <div class="flex justify-end">
        <button
          type="button"
          class="px-4 text-red-100 font-bold"
          @click="logout"
        >
          Logout
        </button>
      </div>
      <h1 class="text-2xl font-bold text-white">
        Welcome,
        {{ state.username }}
      </h1>
    </header>

    <section
      ref="chat"
      class="h-[calc(100vh-12rem)] overflow-y-scroll bg-white rounded-t-2xl flex flex-col px-6 py-8 space-y-4"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        :class="message.username === state.username ? 'self-end' : 'self-start'"
      >
        <div
          :class="
            message.username === state.username
              ? 'flex flex-col items-end'
              : 'flex flex-col items-start'
          "
        >
          <span class="text-gray-500 text-sm">
            {{ message.username }}
          </span>
          <p
            :class="[
              'rounded-2xl p-2 px-4 mt-1.5 font-medium',
              message.username === state.username
                ? 'bg-rose-600 text-white'
                : 'bg-gray-200 text-gray-900',
            ]"
          >
            {{ message.content }}
          </p>
        </div>
      </div>
    </section>

    <footer class="h-24 flex justify-center items-center px-6 bg-white">
      <form class="w-full flex space-x-2" @submit.prevent="sendMessage">
        <div class="flex-1">
          <input
            v-model="inputMessage"
            class="w-full border border-gray-300 rounded"
            type="text"
            placeholder="write a message"
          />
        </div>
        <button
          class="px-4 bg-rose-600 text-white text-sm rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </footer>
  </div>
</template>
