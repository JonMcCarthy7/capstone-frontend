import { GET_TASTING_NOTES_SUCCESS, ADD_TASTING } from "./actions.type";
import { SET_TASTING_NOTES } from "./mutations.type";
import axios from "@/axios";

const state = {
  tastingNotes: []
};

const getters = {
  tastingNotes: state => {
    return state.tastingNotes;
  }
};

const actions = {
  [GET_TASTING_NOTES_SUCCESS]({ commit }) {
    axios
      .get("/tasting_notes")
      .then(data => {
        commit(SET_TASTING_NOTES, data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [ADD_TASTING]({ commit }, data) {
    axios
      .post(
        `/users/${data.users_id}/coffee/${data.coffee_id}/tastings`,
        data.tasting
      )
      .then(tasting_id => {
        console.log("TASTING ID", tasting_id.data.id[0]);
        axios
          .post(
            `/tastings_tasting_notes/${tasting_id.data.id[0]}`,
            data.tasting_ids
          )
          .then(results => {
            console.log(results);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const mutations = {
  [SET_TASTING_NOTES](state, payload) {
    state.tastingNotes = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
