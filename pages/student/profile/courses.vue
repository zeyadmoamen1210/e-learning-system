<template>
  <MyCourses />
</template>

<script>
import MyCourses from "@/components/Students/MyCourses.vue";

export default {
  components: {
    MyCourses,
  },
  middleware: ["not-admin"],
};
</script>
