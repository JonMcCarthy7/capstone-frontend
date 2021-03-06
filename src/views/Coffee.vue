<template>
  <div v-if="coffee">
    <h1 class="subheading grey--text mt-1">Coffee</h1>
    <v-container class="my-3" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card color class="grey--text">
            <v-card-title primary-title class="grey lighten-2">
              <v-layout align-center justify-space-between row wrap fill-height>
                <div class="display-2 grey--text text--darken-2">{{coffee.coffee_name}}</div>
                <v-speed-dial v-if="currentUser" ml-3 absolute dark right small direction="bottom">
                  <v-btn slot="activator" color="primary darken-2" dark fab>
                    <v-icon>settings</v-icon>
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn
                    :to="{name: 'edit_coffee', params:{coffee_id: coffee.id}}"
                    fab
                    dark
                    small
                    color="secondary"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    :to="{name: 'add_tasting', params:{coffee_id: coffee.id}}"
                    fab
                    dark
                    small
                    color="accent"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn @click="deleteCoffee" fab dark small color="red">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-speed-dial>
              </v-layout>
            </v-card-title>
            <v-layout row wrap grid-list-md>
              <v-flex xs12 sm12 md5 pa-3>
                <div class="caption grey--text">Origin</div>
                <div class="headline grey--text text--darken-2 ml-3 mb-3">{{coffee.origin}}</div>
                <div class="caption grey--text">Processing Method</div>
                <div
                  class="headline grey--text text--darken-2 ml-3 mb-3"
                >{{coffee.processing_method}}</div>
                <div class="caption grey--text">Altitude</div>
                <div class="headline grey--text text--darken-2 ml-3 mb-3">{{coffee.altitude}} ft.</div>
                <div class="caption grey--text">Region</div>
                <div class="headline grey--text text--darken-2 ml-3 mb-3">{{coffee.region}}</div>
                <div class="caption grey--text">Varietal</div>
                <div class="headline grey--text text--darken-2 ml-3 mb-3">{{coffee.varietal}}</div>
                <div class="caption grey--text">Coffee Shop</div>
                <div class="headline grey--text text--darken-2 ml-3 mb-3">{{coffee.shop}}</div>
                <div class="headline grey--text text--darken-2">
                  Favorite
                  <span v-if="coffee.favorite">
                    <v-icon>check</v-icon>
                  </span>
                  <span v-else>
                    <v-icon>close</v-icon>
                  </span>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md7 pa-3>
                <p class="grey--text text--darken-2 subheading">{{coffee.notes}}</p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-container>

    <v-container grid-list-md v-if="tastings.length > 0">
      <v-timeline dense clipped>
        <div v-for="t in tastings" :key="t.id">
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-timeline-item class="mb-3" medium>
                <v-layout align-center row wrap>
                  <v-flex xs12 sm3 md3>
                    <v-chip
                      class="white--text ml-0"
                      color="primary"
                      label
                      small
                    >{{formattedDate(t.tasting_date)}}</v-chip>
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    md3
                    class="title grey--text text--darken-2"
                  >Brew Method: {{t.brew_method}}</v-flex>
                  <v-flex xs12 sm3 md3>
                    <v-rating :value="Number(t.rating)" medium readonly></v-rating>
                  </v-flex>
                  <v-flex xs12 sm3 md3 class="text-xs-center">
                    <v-dialog width="80em">
                      <v-btn slot="activator" color="accent" fab>
                        <v-icon>speaker_notes</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title primary-title class="grey lighten-2">
                          <v-layout align-start row wrap>
                            <v-speed-dial
                              v-if="currentUser"
                              ml-3
                              absolute
                              dark
                              right
                              small
                              direction="bottom"
                            >
                              <v-btn slot="activator" color="primary darken-2" dark fab>
                                <v-icon>settings</v-icon>
                                <v-icon>close</v-icon>
                              </v-btn>
                              <v-btn
                                :to="{name: 'edit_tasting', params:{coffee_id: t.coffee_id, tastings_id: t.id}}"
                                fab
                                dark
                                small
                                color="secondary"
                              >
                                <v-icon>edit</v-icon>
                              </v-btn>
                              <v-btn @click="deleteTasting(t.id)" fab dark small color="red">
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </v-speed-dial>
                            <div class="display-2 grey--text text--darken-2">{{t.brew_method}}</div>
                            <v-rating :value="Number(t.rating)" large readonly></v-rating>
                          </v-layout>
                        </v-card-title>
                        <v-container grid-list-lg>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md6>
                              <p class="title grey--text text--darken-2">Body {{t.body}}</p>
                              <v-slider readonly :min="0" :max="5" :step="0.5" :value="t.body"></v-slider>
                              <p class="mt-2 title grey--text text--darken-2">Acidity {{t.acidity}}</p>
                              <v-slider readonly :min="0" :max="5" :step="0.5" :value="t.acidity"></v-slider>
                              <p
                                class="mt-2 title grey--text text--darken-2"
                              >Smoothness {{t.smoothness}}</p>
                              <v-slider
                                readonly
                                :min="0"
                                :max="5"
                                :step="0.5"
                                :value="t.smoothness"
                              ></v-slider>
                              <p
                                class="mt-2 title grey--text text--darken-2"
                              >Sweetness {{t.sweetness}}</p>
                              <v-slider readonly :min="0" :max="5" :step="0.5" :value="t.sweetness"></v-slider>
                            </v-flex>
                            <v-flex xs12 sm12 md6>
                              <div class="mb-3 title grey--text text--darken-2">
                                Favorite
                                <span v-if="t.favorite">
                                  <v-btn fab disabled>
                                    <v-icon>check</v-icon>
                                  </v-btn>
                                </span>
                                <span v-else>
                                  <v-btn fab disabled>
                                    <v-icon>close</v-icon>
                                  </v-btn>
                                </span>
                              </div>
                              <div
                                class="mb-4 title grey--text text--darken-2"
                              >Tasting Date: {{formattedDate(t.tasting_date)}}</div>

                              <div class="title grey--text text--darken-2">
                                Tasting Notes
                                <span v-for="(tn, index) in t.array_agg" :key="index">
                                  <v-chip>{{tn}}</v-chip>
                                </span>
                              </div>
                            </v-flex>
                          </v-layout>
                          <v-divider></v-divider>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md6 class="px-3">
                              <div class="mb-1 title grey--text text--darken-2">Roasting Profile</div>

                              <p class="grey--text text--darken-2 subheading">{{t.roasting_profile}}</p>
                            </v-flex>
                            <v-flex xs12 sm12 md6 class="px-3">
                              <div class="mb-1 title grey--text text--darken-2">Description</div>
                              <p class="grey--text text--darken-2 subheading">{{t.description}}</p>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-flex>
          </v-layout>
        </div>
      </v-timeline>
    </v-container>
  </div>
  <div v-else class="text-xs-center">
    <v-progress-circular :size="800" :width="15" color="blue" indeterminate></v-progress-circular>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_COFFEE,
  GET_COFFEE_TASTINGS,
  DELETE_COFFEE_SUCCESS,
  DELETE_TASTING_SUCCESS
} from "@/store/actions.type";
import moment from "moment";
export default {
  data() {
    return { fab: false, currentUser: false };
  },
  computed: {
    ...mapGetters(["coffee", "tastings"])
  },
  methods: {
    formattedDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    deleteCoffee() {
      this.$store
        .dispatch(DELETE_COFFEE_SUCCESS, {
          users_id: this.$store.state.auth.user.id,
          coffee_id: this.$route.params.coffee_id
        })
        .then(() =>
          this.$router.push({
            name: "dashboard",
            params: { users_id: this.$store.state.auth.user.id }
          })
        )
        .catch(err => console.log(err));
    },
    deleteTasting(id) {
      console.log(id);
      this.$store
        .dispatch(DELETE_TASTING_SUCCESS, {
          users_id: this.$store.state.auth.user.id,
          coffee_id: this.$route.params.coffee_id,
          tastings_id: id
        })
        .then(() =>
          this.$router.push({
            name: "coffee",
            params: {
              users_id: this.$store.state.auth.user.id,
              coffee_id: this.$route.params.coffee_id
            }
          })
        )
        .catch(err => console.log(err));
    }
  },
  created() {
    this.$store
      .dispatch(GET_COFFEE, {
        users_id: this.$route.params.users_id,
        coffee_id: this.$route.params.coffee_id
      })
      .then(() => {
        this.$store.dispatch(GET_COFFEE_TASTINGS, {
          users_id: this.$route.params.users_id,
          coffee_id: this.$route.params.coffee_id
        });
      });
    this.currentUser =
      this.$store.state.auth.user.id == this.$route.params.users_id;
  }
};
</script>
<style>
.v-speed-dial {
  z-index: 0;
}
.v-dialog .v-rating {
  margin-right: 7em;
}
</style>


