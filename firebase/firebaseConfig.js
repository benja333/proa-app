// firebase/firebaseConfig.js

// Importar Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-T2J5DsWlDDjV9HXAb6Ac4CEbgkIXnaM",
  authDomain: "app-proa.firebaseapp.com",
  projectId: "app-proa",
  storageBucket: "app-proa.firebasestorage.app",
  messagingSenderId: "661932281426",
  appId: "1:661932281426:web:579df6eaed61716de3598b",
  // measurementId lo eliminamos porque no lo usamos
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar Firebase Auth
export const auth = getAuth(app);
