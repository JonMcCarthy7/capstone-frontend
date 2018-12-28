import { ADD_COFFEE, GET_COFFEE } from "./actions.type";
import { ADD_COFFEE_STATE } from "./mutations.type";
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
  [ADD_COFFEE]({ commit }, coffee) {
    axios
      .post("/coffee", coffee)
      .then(data => {
        commit(ADD_COFFEE_STATE, data.data.coffee);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [GET_COFFEE]({ commit }, users_id) {
    axios
      .get(`/users/${users_id}/coffee`)
      .then(data => {
        commit(ADD_COFFEE_STATE, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  [ADD_COFFEE_STATE](state, payload) {
    state.coffee = [...payload, ...state.coffee];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
