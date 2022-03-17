import { getDatabase, ref, push, set, onValue } from "firebase/database"
import { ref as vueRef, watch, nextTick } from "vue"

function useChat() {
  const db = getDatabase()
  const chat = vueRef(null)
  const messages = vueRef([])
  const messagesRef = ref(db, "messages")

  function setMessage(message) {
    const { username, content } = message

    if (username.value === "" || username.value === null) {
      return
    }

    if (content.value === "" || content.value === null) {
      return
    }

    const newMessage = push(messagesRef)

    set(newMessage, message)
  }

  function getMessages() {
    onValue(messagesRef, (snapshot) => {
      let variantMessages = []
      const data = snapshot.val()

      Object.keys(data).forEach((key) => {
        variantMessages.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
        })
      })

      messages.value = variantMessages
    })
  }

  async function scrollDown() {
    console.dir(chat.value)
    if (chat.value !== null) {
      await nextTick()
      chat.value.scrollTop = chat.value.scrollHeight
    }
  }

  watch(chat, async () => {
    await scrollDown()
  })

  watch(messages, async () => {
    await scrollDown()
  })

  return {
    chat,
    messages,
    setMessage,
    getMessages,
    scrollDown,
  }
}

export default useChat
