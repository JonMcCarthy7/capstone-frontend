import Vue from "vue";
import Router from "vue-router";
import LogIn from "./views/LogIn.vue";
import Register from "./views/Register.vue";
import Dashboard from "./views/Dashboard.vue";
import AddCoffee from "./views/AddCoffee.vue";
import AddTasting from "./views/AddTasting.vue";
import Coffee from "./views/Coffee.vue";
import EditCoffee from "./views/EditCoffee.vue";
import EditTasting from "./views/EditTasting.vue";

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
    },
    {
      path: "/add_tasting/:coffee_id",
      name: "add_tasting",
      component: AddTasting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/coffee/:coffee_id",
      name: "coffee",
      component: Coffee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit_coffee/:coffee_id",
      name: "edit_coffee",
      component: EditCoffee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit_tasting/:coffee_id/:tastings_id",
      name: "edit_tasting",
      component: EditTasting,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
