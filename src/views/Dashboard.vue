<template>
  <div>YOU MADE IT! {{this.$store.state.auth.user.username}}</div>
</template>

<script>
export default {
  data() {
    return {
      user: ""
    };
  }
};
</script>
