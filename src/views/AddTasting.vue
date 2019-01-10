<template>
  <div>
    <h1 class="subheading grey--text mt-1">Add Coffee Tasting</h1>
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
            <v-text-field v-model="brew_method" :rules="textRules" label="Brew Method" required></v-text-field>
            <v-autocomplete
              v-if="tastingNotes.length > 0"
              v-model="tastings"
              :items="tastingNotes"
              item-text="tasting_note"
              item-value="id"
              chips
              deletable-chips
              :rules="[v => !!v || 'Item is required']"
              label="Tasting Notes"
              prepend-icon
              multiple
              required
            ></v-autocomplete>
            <v-switch v-model="favorite" :label="`Favorite: ${favorite ? 'Yes' : 'No'}`"></v-switch>

            <v-date-picker v-model="tasting_date" landscape></v-date-picker>
          </v-flex>
          <v-flex xs12 md6>
            <v-card class="pa-3 grey lighten-5">
              <span class="subheading grey--text text--darken-2">Overall Rating</span>
              <v-rating hover large half-increments v-model="rating"></v-rating>
              <v-divider class="my-3"></v-divider>
              <p class="mt-2 subheading grey--text text--darken-2">Body {{this.body}}</p>
              <v-slider ticks tick-size="1" :min="0" :max="5" :step="0.5" v-model="body"></v-slider>
              <p class="mt-2 subheading grey--text text--darken-2">Acidity {{this.acidity}}</p>

              <v-slider ticks tick-size="1" :min="0" :max="5" :step="0.5" v-model="acidity"></v-slider>
              <p class="mt-2 subheading grey--text text--darken-2">Smoothness {{this.smoothness}}</p>

              <v-slider ticks tick-size="1" :min="0" :max="5" :step="0.5" v-model="smoothness"></v-slider>
              <p class="mt-2 subheading grey--text text--darken-2">Sweetness {{this.sweetness}}</p>

              <v-slider ticks tick-size="1" :min="0" :max="5" :step="0.5" v-model="sweetness"></v-slider>
            </v-card>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6>
              <v-textarea
                box
                rows="15"
                v-model="roasting_profile"
                name="roasting_profile"
                label="Roasting Profile"
              ></v-textarea>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-textarea
                box
                rows="15"
                v-model="description"
                name="description"
                label="Description"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-layout>
        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { GET_TASTING_NOTES_SUCCESS, ADD_TASTING } from "@/store/actions.type";

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
    ...mapGetters(["tastingNotes"])
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(ADD_TASTING, {
            users_id: this.$store.state.auth.user.id,
            coffee_id: this.$router.history.current.params.coffee_id,
            tasting: {
              brew_method: this.brew_method,
              favorite: this.favorite,
              rating: +this.rating,
              body: +this.body,
              acidity: +this.acidity,
              sweetness: +this.sweetness,
              smoothness: +this.smoothness,
              tasting_date: this.tasting_date,
              roasting_profile: this.roasting_profile,
              description: this.description
            },
            tasting_ids: this.tastings
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
    this.$store.dispatch(GET_TASTING_NOTES_SUCCESS);
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