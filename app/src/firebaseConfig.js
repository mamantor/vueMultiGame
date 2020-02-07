import firebase from "firebase";
require ('firebase/database');
require ('firebase/app');
require ('firebase/storage');

const firebaseConfig = {
    apikey:process.env.VUE_APP_APIKEY,
    authdomain:process.env.VUE_APP_AUTHDOMAIN,
    databaseURL:process.env.VUE_APP_DATABASEURL,
    projectid:process.env.VUE_APP_PROJECTID,
    storagebucket:process.env.VUE_APP_STORAGEBUCKET,
    messagingsenderid:process.env.VUE_APP_MESSAGINGSENDERID,
    appid:process.env.VUE_APP_APPID,
    measurementid:process.env.VUE_APP_MEASUREMENTID
  }
  
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  
  export {
    database
  }
