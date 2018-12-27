<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field v-model="coffee_name" :rules="nameRules" label="Coffee Name" required></v-text-field>
          <v-autocomplete
            v-model="coffee_origin"
            :items="coffee_origins"
            :rules="[v => !!v || 'Item is required']"
            label="Coffee Origin"
            prepend-icon="landscape"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="processing_method"
            :items="processing_methods"
            :rules="[v => !!v || 'Item is required']"
            label="Processing Method"
            required
          ></v-autocomplete>
          <v-text-field v-model="region" :rules="nameRules" label="Region / Farm" required></v-text-field>
          <v-text-field v-model="varietal" :rules="nameRules" label="Varietal" required></v-text-field>
          <v-text-field v-model="shop" :rules="nameRules" label="Coffee Shop" required></v-text-field>
          <v-text-field v-model="altitude" :rules="nameRules" label="Altitude" required></v-text-field>
        </v-flex>
        <v-flex xs12 md6>
          <v-textarea box rows="15" prepend-icon="notes" name="notes" label="Notes"></v-textarea>
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
export default {
  data: () => ({
    valid: true,
    coffee_name: "",
    varietal: "",
    shop: "",
    altitude: "",
    coffee_origin: "",
    processing_method: "",
    coffee_origins: [...origins],
    processing_methods: [...methods],
    region: "",
    nameRules: [
      v => !!v || "Field is required",
      v => (v && v.length >= 3) || "Must be at least 3 characters"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>