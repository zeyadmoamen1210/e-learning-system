<template>
  <div v-loading.fullscreen="isLoading">
    <div v-show="!isLoading">
      <div class="my-courses__title-icon mb-4">
        <img src="@/assets/imgs/vuesax-linear-note.svg" alt="" />
        <h6 class="my-courses__title">أختر من الكورسات</h6>
      </div>
      <div class="my-courses-list" v-if="courses.length > 0">
        <nuxt-link :to="to + course.course_id || `/student/profile/course-statistics/${course.course_id}`" tag="div" class="course-item" v-for="(course, index) in courses" :key="index">
          <img src="@/assets/imgs/course.svg" class="course-item__img" alt="">
          <h6 class="font-h5 font--semibold course-item__header"> {{course.course_name}} </h6>
        </nuxt-link>
      </div>
      <NoData v-else text="لا توجد كورسات" />
    </div>
  </div>
</template>

<script>
import NoData from '@/components/NoData.vue';
export default {
  components: {
    NoData
  },
  props: {
    to: {
      required: false,
    }
  },
  data() {
    return {
      isLoading: true,
      courseLoading: null,
      currCourse: null,
      courses: [],
      exams: []
    }
  },
  mounted() {
    this.getCoursesSolutions();
  },
  methods: {
    async openCourseDetails(id, index) {
      if(this.currCourse === index) {
        this.currCourse = null;
        return;
      }
      this.courseLoading = this.currCourse = index;
      try {
        const req = await this.$axios.get(`/student-course-exams`, {params: {course_id: id}})
        this.exams = req.data;
      } finally {
        this.courseLoading = null;
      }
    },
    async getCoursesSolutions() {
      this.isLoading = true;
      try {
        const req = await this.$axios.get(`/student-solutions`, {params: {student_id: this.$route.params.id || null }});
        this.courses = req.data;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-courses-list {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
  gap: 2rem;
  padding: 0 1rem 1rem;
  .course-item {
    padding: 4rem 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 0 21px -5px #00000026;
    &:hover {
      transform: translateY(-.5rem);
    }
    &__header {
      text-align: center;
      color: #008DD2;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &__img {
      width: 60px;
      display: block;
      margin: auto;
      margin-bottom: 1rem;
    }
  }
}
</style>
