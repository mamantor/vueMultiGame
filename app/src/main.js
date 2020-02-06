import Vue from "vue";
import firebase from "firebase";
require ('firebase/database');
require ('firebase/app');
require ('firebase/storage');
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";
const axios = require('axios').default;

Vue.config.productionTip = false;

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
console.log(process.env.VUE_APP_APIKEY)
console.log(firebase.app());

// Get a database reference to our blog
// var db = admin.database();
// var ref = db.ref("server/saving-data/fireblog");
// console.log("ref");
// console.log(ref);
// console.log("db");
// console.log(db);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
