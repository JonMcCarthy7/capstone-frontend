import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import LogIn from "./views/LogIn.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/log_in",
      name: "log_in",
      component: LogIn
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});
