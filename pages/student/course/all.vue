<template>
  <div class="container">
    <CoursesList />
  </div>
</template>

<script>
import CoursesList from "~/components/Students/CoursesList.vue";

export default {
  name: "CoursePreview",
  middleware: ["not-admin"],
  auth: false,
  components: { CoursesList },
};
</script>
