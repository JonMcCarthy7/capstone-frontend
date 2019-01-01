<template>
  <v-content>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="pa-3">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>

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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="submit">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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

