import { createApp } from "vue"
import { createPinia } from "pinia"
import { initializeApp } from "firebase/app"

import App from "./App.vue"
// import router from "./router"
import "@/styles/index.css"

const firebaseConfig = {
  apiKey: "AIzaSyAGLOeWp2fm5Y5F_Mq-NFP3CDX0Ak21Ias",
  authDomain: "vue-firebase-chat-test-afb1a.firebaseapp.com",
  databaseURL:
    "https://vue-firebase-chat-test-afb1a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-firebase-chat-test-afb1a",
  storageBucket: "vue-firebase-chat-test-afb1a.appspot.com",
  messagingSenderId: "7764300241",
  appId: "1:7764300241:web:0aabd5bc5907b75967d0f0",
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
// app.use(router)

app.mount("#app")
