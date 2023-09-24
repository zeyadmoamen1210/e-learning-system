<template>
  <CoursesForStatistics />
</template>

<script>
import CoursesForStatistics from '@/components/CoursesForStatistics.vue';
export default {
  components:{
    CoursesForStatistics
  },
  middleware: ["not-admin"],

}
</script>

