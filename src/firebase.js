import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgOSLq79tj1vFRwKwRuCb7j9xZrwbJTFI",
  authDomain: "fancy-todo-app-demo.firebaseapp.com",
  projectId: "fancy-todo-app-demo",
  storageBucket: "fancy-todo-app-demo.appspot.com",
  messagingSenderId: "1028895211903",
  appId: "1:1028895211903:web:fed8728406240438f65a4a",
  measurementId: "G-81H85V337V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// database
const db = firebaseApp.firestore();

// Auth
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;