<template>
  <nav>
    <v-toolbar flat app dark color="grey darken-3">
      <v-toolbar-side-icon v-if="isLogged" @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Un</span>
        <span>Brewed</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu v-if="isLogged" offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn v-if="isLogged" flat color="grey">
        <span @click="logOut">Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon class="white--text">account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{this.$store.state.auth.user.username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-flex class="mt-2"></v-flex>
        <v-divider></v-divider>
        <v-flex class="mt-3"></v-flex>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";
export default {
  components: {},
  data() {
    return {
      drawer: false,
      links: [
        { icon: "list", text: "Feed", route: "/" },
        {
          icon: "dashboard",
          text: "Dashboard",
          route: `/dashboard/${this.users_id}`
        },
        { icon: "add", text: "Add Coffee", route: "/add_coffee" }
      ]
    };
  },
  props: ["users_id"],
  computed: {
    isLogged() {
      return !!this.$store.state.auth.user.id ? true : false;
    }
  },
  methods: {
    logOut() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.go({ name: "log_in" }))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>