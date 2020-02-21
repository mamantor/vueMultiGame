import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/lobby",
  //   name: "lobby",
  //   component: Lobby
  // },
  {
    path: "/lobby/:sessionId/:caster?",
    component: Lobby
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      About
  }
];

const router = new VueRouter({
  routes
});

export default router;
