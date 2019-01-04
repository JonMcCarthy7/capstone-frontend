import {
  ADD_COFFEE_SUCCESS,
  GET_ALL_COFFEE,
  GET_COFFEE,
  GET_COFFEE_TASTINGS,
  EDIT_COFFEE_SUCCESS
} from "./actions.type";
import {
  ADD_COFFEE,
  SET_COFFEE,
  COFFEE,
  COFFEE_TASTINGS
} from "./mutations.type";
import axios from "@/axios";

const state = {
  coffee: [],
  tastings: []
};

const getters = {
  coffee: state => {
    return state.coffee;
  },
  tastings: state => {
    return state.tastings;
  },
  coffeeShow: state => id => state.coffee.find(el => el.id == id)
};

const actions = {
  [ADD_COFFEE_SUCCESS]({ commit }, coffee) {
    axios
      .post("/coffee", coffee)
      .then(data => {
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
    // axios
    //   .post(
    //     `/users/${payload.coffee.users_id}/coffee/${payload.coffee_id}`,
    //     payload.coffee
    //   )
    //   .then(data => {
    //     console.log("Updated Coffee", data.data);
    //     // commit(ADD_COFFEE, data.data.coffee[0]);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  [GET_ALL_COFFEE]({ commit }, users_id) {
    axios
      .get(`/users/${users_id}/coffee`)
      .then(data => {
        commit(SET_COFFEE, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [GET_COFFEE]({ commit }, payload) {
    axios
      .get(`/users/${payload.users_id}/coffee/${payload.coffee_id}`)
      .then(data => {
        commit(COFFEE, data.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [GET_COFFEE_TASTINGS]({ commit }, payload) {
    axios
      .get(`/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings`)
      .then(data => {
        commit(COFFEE_TASTINGS, data.data);
      })
      .catch(err => {
        console.log(err);
      });
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
