import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAGLOeWp2fm5Y5F_Mq-NFP3CDX0Ak21Ias",
  authDomain: "vue-firebase-chat-test-afb1a.firebaseapp.com",
  projectId: "vue-firebase-chat-test-afb1a",
  storageBucket: "vue-firebase-chat-test-afb1a.appspot.com",
  messagingSenderId: "7764300241",
  appId: "1:7764300241:web:0aabd5bc5907b75967d0f0",
}

const app = initializeApp(firebaseConfig)

// Get a reference to the database service
const database = getDatabase(app)

export default database
