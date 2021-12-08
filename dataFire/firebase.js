// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/database"; 
import "firebase/storage"; 
// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
    
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.database(); 

export { auth, storage, db };
