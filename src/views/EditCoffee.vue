<template>
  <v-form ref="form" v-model="valid" lazy-validation v-if="coffee">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-model="coffee.coffee_name"
            :rules="textRules"
            label="Coffee Name"
            required
          ></v-text-field>
          <v-autocomplete
            v-model="coffee.origin"
            :items="coffee_origins"
            :rules="[v => !!v || 'Item is required']"
            label="Coffee Origin"
            prepend-icon="landscape"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="coffee.processing_method"
            :items="processing_methods"
            :rules="[v => !!v || 'Item is required']"
            label="Processing Method"
            required
          ></v-autocomplete>
          <v-text-field v-model="coffee.region" :rules="textRules" label="Region / Farm"></v-text-field>
          <v-text-field v-model="coffee.varietal" :rules="textRules" label="Varietal"></v-text-field>
          <v-text-field v-model="coffee.shop" :rules="textRules" label="Coffee Shop"></v-text-field>
          <v-text-field v-model="coffee.altitude" :rules="textRules" label="Altitude"></v-text-field>
          <v-switch
            v-model="coffee.favorite"
            :label="`Favorite: ${coffee.favorite ? 'Yes' : 'No'}`"
          ></v-switch>
        </v-flex>
        <v-flex xs12 md6>
          <v-textarea
            box
            rows="15"
            prepend-icon="notes"
            v-model="coffee.notes"
            name="notes"
            label="Notes"
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
import { EDIT_COFFEE_SUCCESS, GET_COFFEE } from "@/store/actions.type";
import origins from "@/assets/coffee_origins";
import methods from "@/assets/coffee_methods";

export default {
  data: () => ({
    valid: true,
    coffee_name: "",
    origin: "",
    shop: "",
    region: "",
    altitude: "",
    favorite: "",
    processing_method: "",
    varietal: "",
    notes: "",
    coffee_origins: [...origins],
    processing_methods: [...methods],
    textRules: [
      v => !!v || "Field is required",
      v => (v && v.length >= 3) || "Must be at least 3 characters"
    ]
  }),
  computed: {
    ...mapGetters(["coffee"])
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(EDIT_COFFEE_SUCCESS, {
            coffee: {
              users_id: this.$store.state.auth.user.id,
              coffee_name: this.coffee.coffee_name,
              origin: this.coffee.origin,
              shop: this.coffee.shop,
              region: this.coffee.region,
              altitude: this.coffee.altitude,
              favorite: this.coffee.favorite,
              processing_method: this.coffee.processing_method,
              varietal: this.coffee.varietal,
              notes: this.coffee.notes
            },
            coffee_id: this.$router.history.current.params.coffee_id
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
    this.$store.dispatch(GET_COFFEE, {
      users_id: this.$store.state.auth.user.id,
      coffee_id: this.$route.params.coffee_id
    });
  }
};
</script>
