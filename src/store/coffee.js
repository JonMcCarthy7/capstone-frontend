import { ADD_COFFEE_SUCCESS, GET_COFFEE } from "./actions.type";
import { ADD_COFFEE, SET_COFFEE } from "./mutations.type";
import axios from "@/axios";

const state = {
  coffee: []
};

const getters = {
  coffee: state => {
    return state.coffee;
  }
};

const actions = {
  [ADD_COFFEE_SUCCESS]({ commit }, coffee) {
    axios
      .post("/coffee", coffee)
      .then(data => {
        console.log("ADDED COFFEE", data.data.coffee[0]);
        // commit(ADD_COFFEE, data.data.coffee[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [GET_COFFEE]({ commit }, user_id) {
    console.log("USER", user_id);

    axios
      .get(`/users/1/coffee`)
      .then(data => {
        commit(SET_COFFEE, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  // [ADD_COFFEE](state, payload) {
  //   state.coffee = [payload, ...state];
  // },
  [SET_COFFEE](state, payload) {
    state.coffee = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
