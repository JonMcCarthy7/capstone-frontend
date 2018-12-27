import { REGISTER, LOGIN, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, VERIFY_USER } from "./mutations.type";
import axios from "@/axios";

const state = {
  user: {},
  token: localStorage.getItem("token")
};

// getters
const getters = {
  // smoothies: state => {
  //   return state.smoothies;
  // }
};

// actions
const actions = {
  [REGISTER]({ commit }, user) {
    axios
      .post("/users", user)
      .then(data => {
        // commit(SET_AUTH, user); SEND MESSAGE HERE
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  },
  [LOGIN]({ commit }, payload) {
    axios
      .post("/sessions", payload)
      .then(data => {
        // console.log(data.data.user);
        return commit(SET_AUTH, data.data);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  },
  [CHECK_AUTH]({ commit }) {
    // if (state.token) {
    axios
      .get("/user")
      .then(data => {
        commit(VERIFY_USER, data.data);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
    // } else {
    //   console.log("ERROR, no token");
    // }
  }
};

// mutations
const mutations = {
  [SET_AUTH](state, payload) {
    localStorage.setItem("token", payload.token);
    state.user = payload.user;
    state.token = payload.token;
  },
  [VERIFY_USER](state, payload) {
    state.user = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
