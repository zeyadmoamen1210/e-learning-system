<template>
  <div v-loading.fullscreen="fullScreenLoading">
    <div v-show="!fullScreenLoading">
      <div class="text-center" v-if="allCourses.length === 0">
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

          <div class="d-flex flex-row-reverse" v-if="total > 1">
            <el-pagination
              :current-page.sync="currPage"
              background
              layout="prev, pager, next"
              :total="total * 10"
              @current-change="getAllCourses"
            >
            </el-pagination>
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
  middleware: ["prevent-student"],
  data() {
    return {
      allCourses: [],
      currPage: 1,
      total: 1,
      fullScreenLoading: true,
      courses: [],
    };
  },
  mounted() {
    this.getAllCourses();
  },
  methods: {
    async getAllCourses() {
      this.fullScreenLoading = true;
      try {
        const res = await this.$axios.get("/admin/courses", {
          params: {
            page: this.currPage,
          },
        });
        this.allCourses = res.data.data;
        this.page = res.data.current_page;
        this.total = res.data.last_page;
      } catch (err) {
        console.log(err);
      } finally {
        this.fullScreenLoading = false;
      }
    },
  },
};
</script>
