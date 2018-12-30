<template>
  <div v-if="coffee">
    <p>{{coffee.coffee_name}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_COFFEE, GET_COFFEE_TASTINGS } from "@/store/actions.type";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["coffee"])
  },
  methods: {},
  created() {
    this.$store.dispatch(GET_COFFEE, {
      usesr_id: 1,
      coffee_id: this.$route.params.coffee_id
    });
    this.$store.dispatch(GET_COFFEE_TASTINGS, {});
  }
};
</script>

