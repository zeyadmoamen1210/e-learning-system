<template>
  <CourseStatistics :student="$route.params.id" />
</template>

<script>
import CourseStatistics from '@/components/CourseStatistics.vue';
export default {
  components:{
    CourseStatistics
  },
  middleware: ['prevent-student'],
  layout: "dashboard",
}
</script>

