<template>
  <div class="container">
    <ExamPlayer
      :solution="$route.params.id"
      :selected-content="null"
      :course="null"
    />
  </div>
</template>
<script>
import ExamPlayer from "~/components/Students/Course/Materials/ExamPlayer.vue";

export default {
  components: {ExamPlayer},
  middleware: ["not-admin"],
}
</script>
