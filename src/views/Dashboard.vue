<template>
  <div>YOU MADE IT! {{this.$store.state.auth.user.username}}</div>
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
    console.log("FUCKING STATE DONT LOAD IN", this.$store.state.auth.user.id);

    this.$store.dispatch(GET_COFFEE, 1);
  }
};
</script>
