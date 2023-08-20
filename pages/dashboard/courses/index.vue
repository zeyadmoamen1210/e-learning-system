<template>
  <div v-loading="fullScreenLoading">
    <div class="text-center" v-if="courses.length === 0">
      <div>
        <img src="@/assets/imgs/dashboard/note-linear-courses.svg" alt="" />
      </div>
      <h6 class="text-center font-h4 mt-3">الكورسات</h6>
      <p class="font--light mb-4 mt-3">لم يتم إضافة أي كورسات</p>

      <Button
        @click.native="$router.push('/dashboard/courses/add')"
        type="success"
        text="إضافة كورس"
        padding="1rem 2.5rem"
      >
        <template>
          <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
        </template>
      </Button>
    </div>
    <div v-else>
      <div class="d-flex justify-content-between mb-3 align-items-center flex-wrap">
        <h6 class="font-h4 font--regular mb-0">الكورسات</h6>
        <div>
          <Button
            type="success"
            text="إضافة كورس جديد"
            padding="1.2rem 1.5rem"
            textClasses="font-h5 font--regular"
            @click.native="$router.push('/dashboard/courses/add')"
          >
            <template>
              <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
            </template>
          </Button>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-6" v-for="(item, index) in allCourses" :key="index">
            <div>
              <Course :details="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import Course from "@/components/Dashboard/Course/Card.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    Course,
  },
  data() {
    return {
      allCourses: [],
      currPage: 1,
      totalPages: 1,
      fullScreenLoading: false,
      courses: [
        {
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن هنا يكتب بنذة بسيطة عن ",
          time: 4,
          price: 452,
        },
        {
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن هنا يكتب بنذة بسيطة عن ",
          time: 4,
          price: 452,
        },
        {
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن هنا يكتب بنذة بسيطة عن ",
          time: 4,
          price: 452,
        },
      ],
    };
  },
  mounted() {
    this.getAllCourses();
  },
  methods: {
    async getAllCourses() {
      this.fullScreenLoading = true;
      try {
        const res = await this.$axios.get("/admin/courses");
        this.allCourses = res.data.data;
        this.currPage = res.data.current_page;
        this.totalPages = res.data.last_page;
      } catch (err) {
        console.log(err);
      } finally {
        this.fullScreenLoading = false;
      }
    },
  },
};
</script>
