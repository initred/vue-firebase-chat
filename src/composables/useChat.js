import { getDatabase, ref, push, set, onValue } from "firebase/database"
import { ref as vueRef } from "vue"

function useChat() {
  const db = getDatabase()
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

  return {
    messages,
    setMessage,
    getMessages,
  }
}
export default useChat
