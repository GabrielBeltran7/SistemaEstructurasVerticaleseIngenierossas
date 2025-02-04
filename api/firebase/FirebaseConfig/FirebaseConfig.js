
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage  } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyC6nUNbKCzZgZKCa2Z27DLEWuNWLOP_z6A",
  authDomain: "sistemadecontroleveisas.firebaseapp.com",
  projectId: "sistemadecontroleveisas",
  storageBucket: "sistemadecontroleveisas.firebasestorage.app",
  messagingSenderId: "919142194403",
  appId: "1:919142194403:web:ffaaabacdccba61e32b9d6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const  storage = getStorage(app)


export { app, auth, db, storage,  };


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// import { getStorage  } from 'firebase/storage';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); 
// const db = getFirestore(app);
// const  storage = getStorage(app)


// export { app, auth, db, storage,  };
