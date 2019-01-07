import { REGISTER, LOGIN, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, VERIFY_USER } from "./mutations.type";
import axios from "@/axios";

const state = {
  user: {},
  token: localStorage.getItem("token") || ""
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
        // commit(SET_AUTH, data);
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
  },
  async [LOGIN]({ commit }, payload) {
    let response = await axios.post("/sessions", payload);
    commit(SET_AUTH, response.data);
    return response;
    // return new Promise((resolve, reject) => {
    // axios
    //   .post("/sessions", payload)
    //   .then(data => {
    //     console.log(axios.defaults);

    //     console.log("DATA>DATA", data.data);
    //     commit(SET_AUTH, data.data);
    //     resolve();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     reject();
    //   });
    // });
  },
  [CHECK_AUTH]({ commit }) {
    axios
      .get("/user")
      .then(data => {
        console.log("CHECK AUTH", data.data);
        commit(VERIFY_USER, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
// mutations
const mutations = {
  [SET_AUTH](state, payload) {
    axios.defaults.headers.token = payload.token;
    localStorage.setItem("token", payload.token);
    state.token = payload.token;
    state.user = payload.user;
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
