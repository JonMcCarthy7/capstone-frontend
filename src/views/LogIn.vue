<template>
  <v-container>
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
  </v-container>
</template>
<script>
import { LOGIN } from "@/store/actions.type";

export default {
  data: () => ({
    email: "",
    password: "",
    show: false,
    valid: true,
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
        this.$store
          .dispatch(LOGIN, {
            email: this.email,
            password: this.password
          })
          .then(() => this.$router.push({ name: "dashboard" }))
          .catch(err => console.log(err));
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

