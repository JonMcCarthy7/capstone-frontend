import {
  ADD_COFFEE_SUCCESS,
  GET_ALL_COFFEE,
  GET_COFFEE,
  GET_COFFEE_TASTINGS,
  GET_COFFEE_TASTING,
  EDIT_COFFEE_SUCCESS,
  EDIT_TASTING_SUCCESS
} from "./actions.type";
import {
  ADD_COFFEE,
  SET_COFFEE,
  COFFEE,
  COFFEE_TASTINGS,
  COFFEE_TASTING
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
  async [EDIT_TASTING_SUCCESS]({ commit }, payload) {
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
        console.log(data.data.rows);

        commit(COFFEE_TASTINGS, data.data.rows);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [GET_COFFEE_TASTING]({ commit }, payload) {
    console.log(payload);

    axios
      .get(
        `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings/${
          payload.tastings_id
        }`
      )
      .then(data => {
        console.log(data.data);

        commit(COFFEE_TASTING, data.data);
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
  },
  [COFFEE_TASTING](state, payload) {
    state.tasting = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
