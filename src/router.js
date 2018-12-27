import Vue from "vue";
import Router from "vue-router";
import LogIn from "./views/LogIn.vue";
import Register from "./views/Register.vue";
import Dashboard from "./views/Dashboard.vue";
import AddCoffee from "./views/AddCoffee.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/log_in",
      name: "log_in",
      component: LogIn,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add_coffee",
      name: "add_coffee",
      component: AddCoffee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
