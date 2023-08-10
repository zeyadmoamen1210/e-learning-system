<template>
  <div>
    <nuxt-link to="/dashboard">dashboard</nuxt-link>
    <nuxt-link to="/student">student</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "fullpage",
  // created() {
  //   if (this.$route.fullPath == "/") {
  //     this.$router.push("/student");
  //   }
  // },
};
</script>
