<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1 class="subheading grey--text mt-1">Add Coffee</h1>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field v-model="coffee_name" :rules="textRules" label="Coffee Name" required></v-text-field>
          <v-autocomplete
            v-model="origin"
            :items="coffee_origins"
            :rules="[v => !!v || 'Item is required']"
            label="Coffee Origin"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="processing_method"
            :items="processing_methods"
            :rules="[v => !!v || 'Item is required']"
            label="Processing Method"
            required
          ></v-autocomplete>
          <v-text-field v-model="region" :rules="textRules" label="Region / Farm"></v-text-field>
          <v-text-field v-model="varietal" :rules="textRules" label="Varietal"></v-text-field>
          <v-text-field v-model="shop" :rules="textRules" label="Coffee Shop"></v-text-field>
          <v-text-field type="number" v-model="altitude" :rules="textRules" label="Altitude"></v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-textarea box rows="24" prepend-icon="notes" v-model="notes" name="notes" label="Notes"></v-textarea>
        </v-flex>
        <v-btn :disabled="!valid" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import origins from "@/assets/coffee_origins";
import methods from "@/assets/coffee_methods";
import { ADD_COFFEE_SUCCESS } from "@/store/actions.type";

export default {
  data: () => ({
    valid: true,
    coffee_name: "",
    origin: "",
    shop: "",
    region: "",
    altitude: "",
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

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(ADD_COFFEE_SUCCESS, {
            users_id: this.$store.state.auth.user.id,
            coffee_name: this.coffee_name,
            origin: this.origin,
            shop: this.shop,
            region: this.region,
            altitude: this.altitude,
            processing_method: this.processing_method,
            varietal: this.varietal,
            notes: this.notes
          })
          .then(() =>
            this.$router.push({
              name: "dashboard",
              params: { users_id: this.$store.state.auth.user.id }
            })
          )
          .catch(err => console.log(err));
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>