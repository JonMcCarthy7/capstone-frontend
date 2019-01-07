<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-md>
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
          <v-card class="pa-3">
            <span>Overall Rating</span>
            <v-rating hover large half-increments v-model="rating"></v-rating>
            <v-divider class="my-3"></v-divider>
            <p class="mt-2">Body: {{this.body}}</p>
            <v-slider :min="0" :max="5" :step="0.5" v-model="body"></v-slider>
            <p class="mt-2">Acidity: {{this.acidity}}</p>

            <v-slider :min="0" :max="5" :step="0.5" v-model="acidity"></v-slider>
            <p class="mt-2">Smoothness: {{this.smoothness}}</p>

            <v-slider :min="0" :max="5" :step="0.5" v-model="smoothness"></v-slider>
            <p class="mt-2">Sweetness: {{this.sweetness}}</p>

            <v-slider :min="0" :max="5" :step="0.5" v-model="sweetness"></v-slider>

            <v-switch v-model="favorite" :label="`Favorite: ${favorite ? 'Yes' : 'No'}`"></v-switch>
            <!-- :label="`Favorite: ${favorite ? <v-icon small>check</v-icon> : <v-icon small>close</v-icon>}`" -->
          </v-card>
          <v-date-picker v-model="tasting_date" landscape></v-date-picker>
        </v-flex>
        <v-flex xs12 md6>
          <v-textarea
            box
            rows="15"
            prepend-icon="notes"
            v-model="roasting_profile"
            name="roasting_profile"
            label="Roasting Profile"
          ></v-textarea>
          <v-textarea
            box
            rows="15"
            prepend-icon="notes"
            v-model="description"
            name="description"
            label="Description"
          ></v-textarea>
        </v-flex>

        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-layout>
    </v-container>
  </v-form>
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
    console.log("ROUTER", this.$router);

    this.$store.dispatch(GET_TASTING_NOTES_SUCCESS);
  }
};
</script>