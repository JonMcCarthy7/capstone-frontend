<template>
  <v-container grid-list-md>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Name" required></v-text-field>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-model="password1"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            v-model="password2"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            required
            class="input-group--focused"
            @click:append="show2 = !show2"
            :error-messages="passwordMatchError()"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn :disabled="!valid" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";
import { log } from "util";

export default {
  data: () => ({
    valid: true,
    name: "",
    show1: false,
    show2: false,
    password1: "",
    password2: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log("IT posted");

        // Native form submission is not yet supported
        // axios.post("/api/submit", {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    passwordMatchError() {
      return this.password1 === this.password2 ? "" : "Passwords must match";
    }
  }
};
</script>

<style>
</style>
