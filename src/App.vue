<template>
  <v-app class="grey lighten-3">
    <Navbar></Navbar>
    <v-container grid-list-md>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
  </v-app>
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
  beforeCreate() {
    let exposedRoutes = ["/log_in", "/register"];
    let pathname = this.$router.history.current.path;

    if (exposedRoutes.indexOf(pathname) < 0)
      this.$store.dispatch(CHECK_AUTH) && console.log("RAN CHECK_AUTH");
  }
};
</script>
