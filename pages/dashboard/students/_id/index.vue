<template>
  <CoursesForStatistics :to="`/dashboard/students/${$route.params.id}/statistics?course_id=`" />
</template>

<script>
import CoursesForStatistics from '@/components/CoursesForStatistics.vue';
export default {
  components:{
    CoursesForStatistics
  },
  middleware: ['prevent-student'],
  layout: "dashboard",
}
</script>

