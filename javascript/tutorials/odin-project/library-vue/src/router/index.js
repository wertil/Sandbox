import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Library from "../views/Library.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/library",
    name: "Library",
    component: Library
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
];

const router = new VueRouter({
  routes
});

export default router;