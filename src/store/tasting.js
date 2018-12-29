import { GET_TASTING_NOTES_SUCCESS } from "./actions.type";
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
  [ADD_TASTING]
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
