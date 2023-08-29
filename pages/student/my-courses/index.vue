<template>
  <div class="my-courses">
    <div class="container" v-loading="loading">
      <div class="my-courses__title-icon">
        <img src="@/assets/imgs/vuesax-linear-note.svg" alt="" />
        <h6 class="my-courses__title">كورساتي</h6>
      </div>

      <div class="row" v-if="courses.length > 0">
        <div class="col-md-6" v-for="(course, index) in courses" :key="index">
          <MyCourse :course="course.course" />
        </div>
      </div>
      <div v-else>
        <NoData text="لا يوجد كورسات مشترك بها" />
      </div>
    </div>
  </div>
</template>

<script>
import MyCourse from "@/components/Students/Course/MyCourse";
import NoData from "@/components/NoData.vue";

export default {
  components: {
    MyCourse,
    NoData,
  },
  middleware: ["not-admin"],
  mounted() {
    this.getMyCourses();
  },
  methods: {
    async getMyCourses() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/my-courses`);
        this.courses = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  data() {
    return {
      courses: [],
      loading: false,
    };
  },
};
</script>
