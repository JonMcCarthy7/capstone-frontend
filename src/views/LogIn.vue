<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :rules="[rules.required]"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      counter
      @click:append="show = !show"
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    show: false,
    password: "",
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required."
    }
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios.post("/api/submit", {
          email: this.email,
          password: this.password
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>

