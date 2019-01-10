import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import coffee from "./coffee";
import tasting from "./tasting";
import feed from "./feed";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    coffee,
    tasting,
    feed,
    user
  }
});
