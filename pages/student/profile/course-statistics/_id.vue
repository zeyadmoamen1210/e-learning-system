<template>
  <CourseStatistics />
</template>

<script>
import CourseStatistics from '@/components/CourseStatistics.vue';
export default {
  components:{
    CourseStatistics
  },
  middleware: ["not-admin"],

}
</script>

