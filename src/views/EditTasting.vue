<template>
  <div v-if="tasting">
    <h1 class="subheading grey--text mt-1">Edit Tasting</h1>
    <div class="right">
      <v-dialog width="80em">
        <v-btn slot="activator">
          <v-icon>donut_large</v-icon>
        </v-btn>
        <v-card>
          <v-container grid-list-lg>
            <v-layout align-center justify-center row wrap>
              <div id="container"></div>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field
              v-model="tasting.tasting[0].brew_method"
              :rules="textRules"
              label="Brew Method"
              required
            ></v-text-field>
            <v-autocomplete
              v-if="tastingNotes.length > 0 && tasting"
              v-model="tasting.notes"
              :items="tastingNotes"
              item-text="tasting_note"
              return-object
              chips
              deletable-chips
              :rules="[v => !!v || 'Item is required']"
              label="Tasting Notes"
              prepend-icon
              multiple
              required
            ></v-autocomplete>
            <v-switch
              v-model="tasting.tasting[0].favorite"
              :label="`Favorite: ${tasting.tasting[0].favorite ? 'Yes' : 'No'}`"
            ></v-switch>
            <p
              class="subheading grey--text text--darken-2"
            >Tasting Date: {{formattedDate(tasting.tasting[0].tasting_date)}}</p>
            <v-date-picker v-model="tasting_date" landscape></v-date-picker>
          </v-flex>
          <v-flex xs12 md6>
            <v-card class="pa-3 grey lighten-5">
              <span class="subheading grey--text text--darken-2">Overall Rating</span>
              <v-rating hover large half-increments v-model="tasting.tasting[0].rating"></v-rating>
              <v-divider class="my-3"></v-divider>
              <p class="mt-2 subheading grey--text text--darken-2">Body {{tasting.tasting[0].body}}</p>
              <v-slider
                ticks
                tick-size="1"
                :min="0"
                :max="5"
                :step="0.5"
                v-model="tasting.tasting[0].body"
              ></v-slider>
              <p
                class="mt-2 subheading grey--text text--darken-2"
              >Acidity {{tasting.tasting[0].acidity}}</p>

              <v-slider
                ticks
                tick-size="1"
                :min="0"
                :max="5"
                :step="0.5"
                v-model="tasting.tasting[0].acidity"
              ></v-slider>
              <p
                class="mt-2 subheading grey--text text--darken-2"
              >Smoothness {{tasting.tasting[0].smoothness}}</p>

              <v-slider
                ticks
                tick-size="1"
                :min="0"
                :max="5"
                :step="0.5"
                v-model="tasting.tasting[0].smoothness"
              ></v-slider>
              <p
                class="mt-2 subheading grey--text text--darken-2"
              >Sweetness {{tasting.tasting[0].sweetness}}</p>

              <v-slider
                ticks
                tick-size="1"
                :min="0"
                :max="5"
                :step="0.5"
                v-model="tasting.tasting[0].sweetness"
              ></v-slider>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-textarea
              box
              rows="15"
              v-model="tasting.tasting[0].roasting_profile"
              name="roasting_profile"
              label="Roasting Profile"
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-textarea
              box
              rows="15"
              v-model="tasting.tasting[0].description"
              name="description"
              label="Description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  GET_TASTING_NOTES_SUCCESS,
  GET_COFFEE_TASTING,
  EDIT_TASTING_SUCCESS
} from "@/store/actions.type";
import moment from "moment";

export default {
  data: () => ({
    valid: true,
    brew_method: "",
    favorite: false,
    rating: 0,
    body: 0,
    acidity: 0,
    sweetness: 0,
    smoothness: 0,
    tasting_date: "",
    roasting_profile: "",
    description: "",
    tastings: [],
    textRules: [
      v => !!v || "Field is required",
      v => (v && v.length >= 3) || "Must be at least 3 characters"
    ]
  }),
  computed: {
    ...mapGetters(["tastingNotes", "tasting"])
  },
  methods: {
    formattedDate(date) {
      return date ? moment(date).format("MM/DD/YYYY") : ""; // Date picker objects needs date in this particular format
    },
    submit() {
      console.log(this.tasting_date);

      this.tasting.notes = this.tasting.notes.map(el => el.id);
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(EDIT_TASTING_SUCCESS, {
            users_id: this.$store.state.auth.user.id,
            coffee_id: this.$router.history.current.params.coffee_id,
            tastings_id: this.$router.history.current.params.tastings_id,
            tasting: {
              brew_method: this.tasting.tasting[0].brew_method,
              favorite: this.tasting.tasting[0].favorite,
              rating: this.tasting.tasting[0].rating,
              body: this.tasting.tasting[0].body,
              acidity: this.tasting.tasting[0].acidity,
              sweetness: this.tasting.tasting[0].sweetness,
              smoothness: this.tasting.tasting[0].smoothness,
              tasting_date:
                this.tasting_date || this.tasting.tasting[0].tasting_date,
              roasting_profile: this.tasting.tasting[0].roasting_profile,
              description: this.tasting.tasting[0].description
            },
            tasting_ids: this.tasting.notes
          })
          .then(() =>
            this.$router.push({
              name: "coffee",
              params: {
                users_id: this.$store.state.auth.user.id,
                coffee_id: this.$router.history.current.params.coffee_id
              }
            })
          )
          .catch(err => console.log(err));
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  created() {
    this.$store
      .dispatch(GET_COFFEE_TASTING, {
        users_id: this.$store.state.auth.user.id,
        coffee_id: this.$router.history.current.params.coffee_id,
        tastings_id: this.$router.history.current.params.tastings_id
      })
      .then(() => {
        this.$store.dispatch(GET_TASTING_NOTES_SUCCESS);
      })
      .then(() => {
        if (
          this.$store.state.auth.user.id !==
          this.$store.state.coffee.tasting.tasting[0].users_id
        )
          this.$router.go(-1);
      });
    setTimeout(() => {
      anychart.onDocumentReady(function() {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/sunburst-charts/coffee-flavour-wheel/data.json
        anychart.data.loadJsonFile(
          "https://cdn.anychart.com/samples/sunburst-charts/coffee-flavour-wheel/data.json",
          function(data) {
            // makes tree from the data for the sample
            var dataTree = anychart.data.tree(data, "as-table");

            // create sunburst chart
            var chart = anychart.sunburst(dataTree);

            // set calculation mode
            chart.calculationMode("ordinal-from-root");

            // set chart title
            // chart.title("Coffee Flavour Wheel");

            // set settings for the penultimate level labels
            chart
              .level(-2)
              .labels()
              .position("radial");

            // set chart labels settings
            chart.labels().hAlign("center");

            // set settings for leaves labels
            chart
              .leaves()
              .labels()
              .minFontSize(8)
              .textOverflow("...");

            // the fill specified in the data has priority
            // set point fill
            chart.fill(function() {
              return anychart.color.darken(this.parentColor, 0.15);
            });

            // set container id for the chart
            chart.container("container");
            // initiate chart drawing
            chart.draw();
          }
        );
      });
    }, 3000);
    // end
  }
};
</script>