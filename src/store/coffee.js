import {
  ADD_COFFEE_SUCCESS,
  GET_USERS_COFFEE,
  GET_COFFEE,
  GET_COFFEE_TASTINGS,
  GET_COFFEE_TASTING,
  EDIT_COFFEE_SUCCESS,
  DELETE_COFFEE_SUCCESS,
  DELETE_TASTING_SUCCESS
} from "./actions.type";
import {
  ADD_COFFEE,
  SET_COFFEE,
  COFFEE,
  COFFEE_TASTINGS,
  COFFEE_TASTING,
  DELETE_TASTING
} from "./mutations.type";
import axios from "@/axios";

const state = {
  coffee: [],
  tastings: [],
  tasting: {}
};

const getters = {
  coffee: state => state.coffee,
  tastings: state => state.tastings,
  coffeeShow: state => id => state.coffee.find(el => el.id == id),
  tasting: state => state.tasting
};

const actions = {
  [ADD_COFFEE_SUCCESS]({ commit }, payload) {
    axios
      .post(`/users/${payload.users_id}/coffee`, payload)
      .then(data => {
        console.log(data);
        console.log("ADDED COFFEE", data.data.coffee[0]);
        commit(ADD_COFFEE, data.data.coffee[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async [EDIT_COFFEE_SUCCESS]({ commit }, payload) {
    let response = await axios.put(
      `/users/${payload.coffee.users_id}/coffee/${payload.coffee_id}`,
      payload.coffee
    );
    return response;
  },
  async [DELETE_COFFEE_SUCCESS]({ commit }, payload) {
    try {
      let response = await axios.delete(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  [GET_USERS_COFFEE]({ commit }, users_id) {
    axios
      .get(`/users/${users_id}/coffee`)
      .then(data => {
        commit(SET_COFFEE, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async [GET_COFFEE]({ commit }, payload) {
    try {
      let response = await axios.get(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}`
      );
      commit(COFFEE, response.data[0]);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async [GET_COFFEE_TASTINGS]({ commit }, payload) {
    try {
      let response = await axios.get(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings`
      );
      commit(COFFEE_TASTINGS, response.data.rows);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async [GET_COFFEE_TASTING]({ commit }, payload) {
    try {
      let response = await axios.get(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings/${
          payload.tastings_id
        }`
      );
      commit(COFFEE_TASTING, response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async [DELETE_TASTING_SUCCESS]({ commit }, payload) {
    try {
      let response = await axios.delete(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings/${
          payload.tastings_id
        }`
      );
      commit(DELETE_TASTING, payload.tastings_id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  [ADD_COFFEE](state, payload) {
    state.coffee = [payload, ...state.coffee];
  },
  [SET_COFFEE](state, payload) {
    state.coffee = payload;
  },
  [COFFEE](state, payload) {
    state.coffee = payload;
  },
  [COFFEE_TASTINGS](state, payload) {
    state.tastings = payload;
  },
  [COFFEE_TASTING](state, payload) {
    state.tasting = payload;
  },
  [DELETE_TASTING](state, payload) {
    state.tastings = state.tastings.filter(el => el.id !== payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
