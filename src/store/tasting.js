import {
  GET_TASTING_NOTES_SUCCESS,
  ADD_TASTING,
  EDIT_TASTING_SUCCESS
} from "./actions.type";
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
      .then(results => {
        commit(SET_TASTING_NOTES, results.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  [ADD_TASTING]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings`,
          payload.tasting
        )
        .then(tasting_id => {
          console.log("TASTING ID", tasting_id.payload.id[0]);
          axios
            .post(
              `/tastings_tasting_notes/${tasting_id.payload.id[0]}`,
              payload.tasting_ids
            )
            .then(results => {
              console.log(results);
              resolve();
            });
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  },
  async [EDIT_TASTING_SUCCESS]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/users/${payload.users_id}/coffee/${payload.coffee_id}/tastings/${
            payload.tastings_id
          }`,
          payload.tasting
        )
        .then(() => {
          axios
            .delete(`/tastings_tasting_notes/${payload.tastings_id}`)
            .then(() => {
              axios
                .post(
                  `/tastings_tasting_notes/${payload.tastings_id}`,
                  payload.tasting_ids
                )
                .then(results => {
                  console.log(results);
                  resolve();
                });
            });
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
    // let response = await axios.put(
    //   `/users/${payload.coffee.users_id}/coffee/${payload.coffee_id}`,
    //   payload.coffee
    // );
    // return response;
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
