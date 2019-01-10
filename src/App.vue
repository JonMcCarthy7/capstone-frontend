<template>
  <div v-if="isLogged">
    <v-app class="grey lighten-3">
      <Navbar :users_id="this.$store.state.auth.user.id"></Navbar>
      <v-content class="mx-4 mb-4">
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
  <div v-else class="text-xs-center">
    <v-progress-circular :size="800" :width="15" color="blue" indeterminate></v-progress-circular>
  </div>
</template>

<script>
import { CHECK_AUTH } from "@/store/actions.type";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      //
    };
  },
  computed: {
    isLogged() {
      let exposedRoutes = ["/log_in", "/register"];
      let pathname = this.$router.history.current.path;
      if (exposedRoutes.indexOf(pathname) < 0)
        return !!this.$store.state.auth.user.id;
      return true;
    }
  },
  beforeCreate() {
    let exposedRoutes = ["/log_in", "/register"];
    let pathname = this.$router.history.current.path;

    if (exposedRoutes.indexOf(pathname) < 0)
      this.$store.dispatch(CHECK_AUTH) && console.log("RAN CHECK_AUTH");
  }
};
</script>
