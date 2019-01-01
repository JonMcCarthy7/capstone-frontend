<template>
  <div v-if="coffee">
    <h1 class="subheading grey--text mb-5">Coffee</h1>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card color class="grey--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{coffee.coffee_name}}</div>
              <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>Listen now</v-btn>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>
        <div v-for="t in tastings" :key="t.id">
          <ul>
            <li>{{t.brew_method}}</li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
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
    ...mapGetters(["coffee", "tastings"])
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

