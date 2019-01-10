<template>
  <v-container>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12 sm10 md8>
        <v-card class="pa-3">
          <v-toolbar-title>Login</v-toolbar-title>
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
              <v-flex xs6>
                <v-btn :disabled="!valid" @click="submit">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-flex>
              <v-flex 6 xs>
                <div class="right">
                  <v-btn color="accent" :to="{name: 'register'}">register</v-btn>
                </div>
              </v-flex>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
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

<style>
</style>

