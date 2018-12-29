<template>
  <div v-if="this.$store.state.auth.user.id">
    <div>YOU MADE IT! {{this.$store.state.auth.user.username}}</div>
    <ul v-if="coffee" v-for="c in coffee">
      <li>{{c.coffee_name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_COFFEE } from "@/store/actions.type";
export default {
  data() {
    return {
      user: ""
    };
  },
  computed: {
    ...mapGetters(["coffee"])
  },
  methods: {},
  created() {
    console.log(this.$store.state.auth.user.id);

    this.$store.dispatch(GET_COFFEE, this.$store.state.auth.user.id);
  }
};

// beforeRouteEnter(to, from, next) {
//   Promise.all([this.$store.dispatch(GET_COFFEE)]).then(() => {
//     next();
//   });
// }
</script>

