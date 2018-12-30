<template>
  <div v-if="this.$store.state.auth.user.id">
    <div>Welcome, {{this.$store.state.auth.user.username}}</div>
    <ul v-if="coffee" v-for="c in coffee" :key="c.id">
      <router-link :to="{name: 'coffee', params:{coffee_id: c.id}}">
        <li>{{c.coffee_name}}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_ALL_COFFEE } from "@/store/actions.type";
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
    this.$store.dispatch(GET_ALL_COFFEE, 1); // TODO: id is hard coded
    // this.$store.dispatch(GET_ALL_COFFEE, this.$store.state.auth.user.id);
  }
};
</script>

