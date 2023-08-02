<template>
  <div class="my-courses">
    <div class="container">
      <div class="my-courses__title-icon">
        <img src="@/assets/imgs/vuesax-linear-note.svg" alt="" />
        <h6 class="my-courses__title">كورساتي</h6>
      </div>

      <div class="row">
        <div class="col-md-6" v-for="(course, index) in courses" :key="index">
          <MyCourse :course="course" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyCourse from "@/components/Students/Course/MyCourse";
export default {
  components: {
    MyCourse,
  },
  data() {
    return {
      courses: [
        {
          name: "مبادئ أساسيات الفيزياء",
          timeOfHours: 4,
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          timeOfHours: 4,
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          timeOfHours: 4,
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          timeOfHours: 4,
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
      ],
    };
  },
};
</script>
