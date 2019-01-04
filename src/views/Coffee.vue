<template>
  <div v-if="coffee">
    <h1 class="subheading grey--text mb-5">Coffee</h1>
    <v-container class="my-5" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card color class="grey--text">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <div class="right">
                  <v-speed-dial v-model="fab" dark bottom right medium direction="left">
                    <v-btn v-model="fab" slot="activator" color="blue darken-2" dark fab>
                      <v-icon>account_circle</v-icon>
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn
                      :to="{name: 'edit_coffee', params:{coffee_id: coffee.id}}"
                      fab
                      dark
                      small
                      color="green"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      :to="{name: 'add_tasting', params:{coffee_id: coffee.id}}"
                      fab
                      dark
                      small
                      color="indigo"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="red">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-speed-dial>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{coffee.coffee_name}}</div>
                    <p>{{coffee.origin}}</p>
                    <p>{{coffee.shop}}</p>
                    <p>{{coffee.region}}</p>
                    <p>{{coffee.altitude}}</p>
                    <p>{{coffee.processing_method}}</p>
                    <p>{{coffee.varietal}}</p>
                    <p>{{coffee.favorite ? "Favorite: Yes" : "Favorite: No"}}</p>
                    <p>{{coffee.notes}}</p>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-container>

    <v-container v-if="tastings.length > 0">
      <v-timeline dense clipped>
        <div v-for="t in tastings" :key="t.id">
          <v-layout row wrap>
            <v-flex xs12>
              <v-timeline-item class="mb-3" medium>
                <v-layout align-center row wrap>
                  <v-flex xs12 sm6 md3>
                    <v-chip
                      class="white--text ml-0"
                      color="primary"
                      label
                      small
                    >{{formattedDate(t.created_at)}}</v-chip>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class>Brew Method: {{t.brew_method}}</v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-rating :value="Number(t.rating)" medium readonly></v-rating>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="text-xs-right">
                    <v-dialog full-width>
                      <v-btn slot="activator" color="accent" fab>
                        <v-icon>speaker_notes</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title primary-title class="grey lighten-2">
                          <v-layout align-start justify-space-around row wrap>
                            <div class="display-2">{{t.brew_method}}</div>
                            <v-rating :value="Number(t.rating)" large readonly></v-rating>
                          </v-layout>
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                        </v-card-actions>
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
</template>

<script>
import { mapGetters } from "vuex";
import { GET_COFFEE, GET_COFFEE_TASTINGS } from "@/store/actions.type";
import moment from "moment";
export default {
  data() {
    return { fab: false };
  },
  computed: {
    ...mapGetters(["coffee", "tastings"])
  },
  methods: {
    formattedDate(date) {
      return moment(date).format("MMMM Do YYYY");
    }
  },
  created() {
    this.$store.dispatch(GET_COFFEE, {
      users_id: this.$store.state.auth.user.id,
      coffee_id: this.$route.params.coffee_id
    });
    this.$store.dispatch(GET_COFFEE_TASTINGS, {
      users_id: this.$store.state.auth.user.id,
      coffee_id: this.$route.params.coffee_id
    });
  }
};
</script>

