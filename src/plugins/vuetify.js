import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#90A4AE",
    secondary: "#757575",
    accent: "#A1887F",
    error: "#D50000",
    warning: "#FFEE58",
    info: "#00BCD4",
    success: "#64DD17"
  }
});
