import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import io from 'socket.io-client';
Object.defineProperty(Vue.prototype, '$io', { value: io });

// import axios from "axios";
const axios = require('axios').default;
Object.defineProperty(Vue.prototype, '$axios', { value: axios });

const fb = require('./firebaseConfig.js')
Object.defineProperty(Vue.prototype, '$fb', { value: fb });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
