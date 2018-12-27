<template>
  <v-app>
    <v-toolbar app></v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { CHECK_AUTH } from "@/store/actions.type";
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  created() {
    let exposedRoutes = ["/log_in", "/register"];
    let pathname = this.$router.history.current.path;
    if (exposedRoutes.indexOf(pathname) < 0) this.$store.dispatch(CHECK_AUTH);
  },
  mounted() {
    console.log(this.$store.state.auth);
  }
};
</script>
