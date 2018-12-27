import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem("token") == null) {
//       next({
//         path: "/log_in",
//         params: { nextUrl: to.fullPath }
//       });
//     } else {
//       let user = store.state.auth.user;
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (user.role === "admin") {
//           next();
//         } else {
//           next({ name: "dashboard" });
//         }
//       } else {
//         next();
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem("token") == null) {
//       next();
//     } else {
//       next({ name: "dashboard" });
//     }
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
