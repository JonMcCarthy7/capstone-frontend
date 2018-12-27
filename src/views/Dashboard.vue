<template>
  <div>YOU MADE IT! {{user}}</div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  created() {
    console.log(this.$store.state.auth);
  }
};
</script>
