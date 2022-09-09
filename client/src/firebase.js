import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyAYrVdxI0_QJOfhvxtlkSzvtGFVGDa8qhM",
    authDomain: "whatsapp-clone-70da6.firebaseapp.com",
    projectId: "whatsapp-clone-70da6",
    storageBucket: "whatsapp-clone-70da6.appspot.com",
    messagingSenderId: "102632679981",
    appId: "1:102632679981:web:9b26209681ba118673e6a4",
    measurementId: "G-0JZG7GGJHD"
  };

  const app=firebase.initializeApp(firebaseConfig)
  const db=app.firestore()
  const auth=app.auth()
  const provider=new firebase.auth.googleAuthProvider()

  export{auth,provider};
  export default db

  