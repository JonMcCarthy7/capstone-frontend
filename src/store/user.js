import { GET_USERS } from "./actions.type";
import { ADD_USERS } from "./mutations.type";
import axios from "@/axios";

const state = {
  users: []
};

const getters = {
  allUsers: state => state.users
};

const actions = {
  async [GET_USERS]({ commit }, payload) {
    try {
      let response = await axios.get(`/users`);
      let users = response.data.filter(el => el.id !== payload);
      commit(ADD_USERS, users);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  [ADD_USERS](state, payload) {
    state.users = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
