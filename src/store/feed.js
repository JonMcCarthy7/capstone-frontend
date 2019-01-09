import { GET_ALL_COFFEE } from "./actions.type";
import { SET_COFFEE } from "./mutations.type";
import axios from "@/axios";

const state = {
  coffee: []
};

const getters = {
  allCoffee: state => state.coffee
  // tastings: state => state.tastings,
  // coffeeShow: state => id => state.coffee.find(el => el.id == id),
  // tasting: state => state.tasting
};

const actions = {
  [GET_ALL_COFFEE]({ commit }, users_id) {
    axios
      .get(`/coffee`)
      .then(data => {
        let coffee = data.data.filter(el => el.users_id !== users_id);
        commit(SET_COFFEE, coffee);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // [GET_COFFEE]({ commit }, payload) {
  //   axios
  //     .get(`/users/${payload.users_id}/coffee/${payload.coffee_id}`)
  //     .then(data => {
  //       commit(COFFEE, data.data[0]);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
  // [GET_COFFEE_TASTINGS]({ commit }, payload) {
  //   axios
  //     .get(`/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings`)
  //     .then(data => {
  //       console.log(data.data.rows);

  //       commit(COFFEE_TASTINGS, data.data.rows);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // },
  // [GET_COFFEE_TASTING]({ commit }, payload) {
  //   axios
  //     .get(
  //       `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings/${
  //         payload.tastings_id
  //       }`
  //     )
  //     .then(data => {
  //       console.log(data.data);

  //       commit(COFFEE_TASTING, data.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};

const mutations = {
  [SET_COFFEE](state, payload) {
    state.coffee = payload;
  }
  // [COFFEE](state, payload) {
  //   state.coffee = payload;
  // },
  // [COFFEE_TASTINGS](state, payload) {
  //   state.tastings = payload;
  // },
  // [COFFEE_TASTING](state, payload) {
  //   state.tasting = payload;
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
