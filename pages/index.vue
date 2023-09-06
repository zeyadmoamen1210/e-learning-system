<template>
  <div>
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from "@/components/Students/LandingPage/index.vue";

export default {
  name: "IndexPage",
  middleware: ["not-admin"],
  auth: false,
  components: {
    LandingPage,
  },
};
</script>
