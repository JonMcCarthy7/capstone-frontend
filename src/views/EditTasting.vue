<template>
  <div v-if="tasting">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container grid-list-md>
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
            <v-card class="pa-3">
              <span>Overall Rating</span>
              <v-rating hover large half-increments v-model="tasting.tasting[0].rating"></v-rating>
              <v-divider class="my-3"></v-divider>
              <p class="mt-2">Body: {{tasting.tasting[0].body}}</p>
              <v-slider :min="0" :max="5" :step="0.5" v-model="tasting.tasting[0].body"></v-slider>
              <p class="mt-2">Acidity: {{tasting.tasting[0].acidity}}</p>

              <v-slider :min="0" :max="5" :step="0.5" v-model="tasting.tasting[0].acidity"></v-slider>
              <p class="mt-2">Smoothness: {{tasting.tasting[0].smoothness}}</p>

              <v-slider :min="0" :max="5" :step="0.5" v-model="tasting.tasting[0].smoothness"></v-slider>
              <p class="mt-2">Sweetness: {{tasting.tasting[0].sweetness}}</p>

              <v-slider :min="0" :max="5" :step="0.5" v-model="tasting.tasting[0].sweetness"></v-slider>

              <v-switch
                v-model="tasting.tasting[0].favorite"
                :label="`Favorite: ${tasting.tasting[0].favorite ? 'Yes' : 'No'}`"
              ></v-switch>
              <!-- :label="`Favorite: ${favorite ? <v-icon small>check</v-icon> : <v-icon small>close</v-icon>}`" -->
            </v-card>
            <p>Tasting Date: {{formattedDate(tasting.tasting[0].tasting_date)}}</p>
            <v-date-picker v-model="tasting_date" landscape></v-date-picker>
          </v-flex>
          <v-flex xs12 md6>
            <v-textarea
              box
              rows="15"
              prepend-icon="notes"
              v-model="tasting.tasting[0].roasting_profile"
              name="roasting_profile"
              label="Roasting Profile"
            ></v-textarea>
            <v-textarea
              box
              rows="15"
              prepend-icon="notes"
              v-model="tasting.tasting[0].description"
              name="description"
              label="Description"
            ></v-textarea>
          </v-flex>

          <v-btn :disabled="!valid" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-layout>
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
              tasting_date: this.tasting.tasting[0].tasting_date,
              roasting_profile: this.tasting.tasting[0].roasting_profile,
              description: this.tasting.tasting[0].description
            },
            tasting_ids: this.tasting.notes
          })
          .then(() =>
            this.$router.push({
              name: "coffee",
              params: this.$router.history.current.params.coffee_id
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
    this.$store.dispatch(GET_COFFEE_TASTING, {
      users_id: this.$store.state.auth.user.id,
      coffee_id: this.$router.history.current.params.coffee_id,
      tastings_id: this.$router.history.current.params.tastings_id
    });
    this.$store.dispatch(GET_TASTING_NOTES_SUCCESS);
  }
};
</script>