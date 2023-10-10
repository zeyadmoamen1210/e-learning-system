<template>
  <div v-loading.fullscreen="loading">
    <div  v-show="!loading">
    <div class="text-center mt-5" v-if="examCorrection.length === 0">
      <div>
        <img src="@/assets/imgs/dashboard/vuesax-linear-task.png" alt="" />
      </div>
      <h6 class="text-center font-h4 mt-3">الاختبارات</h6>
      <p class="font--light mb-4 mt-3">لا يوجد لديك أي اختبارات لتصحيحها</p>
    </div>
    <div v-else>
      <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
        <div>
          <h6 class="font-h4 font--regular">تصحيح الاختبارات</h6>
          <p class="font--light font-h5">
            عرض لجميع أسئلة الاختبارات التي تحتاج إلى التصحيح
          </p>
        </div>
        <div>
          <Button
            @click.native="examCorrectionFilterPopup = true"
            padding="1.2rem 1.5rem"
            textClasses="font-h5 font--regular"
            type="primary"
            text="فلترة"
          >
            <template>
              <img src="@/assets/imgs/dashboard/candle-2-bulk.svg" alt="" />
            </template>
          </Button>
        </div>
      </div>


      <div class="app-table-container">
          <table class="app-table">
            <thead>
              <th>
                <td> اسم الطالب </td>
              </th>
              <th>
                <td> اسم الكورس</td>
              </th>
              <th>
                <td> اسم الاختبار </td>
              </th>
              <th>
                <td> خيارات </td>
              </th>
            </thead>
            <tbody>
              <tr v-for="(solution, index) in solutions" :key="index">
                <td> {{ solution.user_name }} </td>
                <td>  {{ solution.course_name }} </td>
                <td>
                  {{ solution.exam_name }}
                </td>
                <td>
                  <div class="d-flex gap-5">
                    <Button
                      @click.native="$router.push(`/dashboard/exam-correction/${solution.solution_id}?user_name=${solution.user_name}&course_name=${solution.course_name}&exam_name=${solution.exam_name}`)"
                      padding="0"
                      type="text-primary"
                      text="تفاصيل الأسئلة">
                      <img src="@/assets/imgs/dashboard/eye-linear.svg" alt="">
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex flex-row-reverse" v-if="total > 1">
              <el-pagination
                :current-page.sync="page"
                background
                layout="prev, pager, next"
                :total="total * 10"
                @current-change="getExamSolutions"
              >
              </el-pagination>
          </div>
      </div>

      <NoData v-if="solutions.length === 0" text="لا يوجد حلول للتصحيح" />
    </div>

    <ExamCorrectionFilter :data="{course_id, exam_id}" v-if="examCorrectionFilterPopup" @filter="setFilterSolutions"  :isOpened="examCorrectionFilterPopup" @close="examCorrectionFilterPopup = false" />
  </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import NoData from "@/components/NoData.vue";
import ExamCorrectionFilter from "@/components/Dashboard/Popups/ExamCorrectionFilter.vue";

export default {
  layout: "dashboard",
  middleware: ['prevent-student'],
  components: {
    Button,
    ExamCorrectionFilter,
    NoData
  },
  mounted() {
    this.getExamSolutions();
  },
  methods: {
    setFilterSolutions(e) {
      this.course_id = e.course_id
      this.exam_id = e.exam_id;
      this.year = e.year;
      this.examCorrectionFilterPopup = false;
      this.getExamSolutions();
    },
    async getExamSolutions() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/exam-solutions`, {params: {page: this.page, course_id: this.course_id, exam_id: this.exam_id, year: this.year}});
        this.solutions = res.data.data;
        this.page = res.data.current_page;
        this.total = res.data.last_page;
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false;
      }
    }
  },
  data() {
    return {
      loading: true,
      solutions: [],
      page: 1,
      total: 1,
      year: null,

      exam_id: null,
      course_id: null,
      examCorrection: [""],
      examCorrectionFilterPopup: false,
    };
  },
};
</script>
