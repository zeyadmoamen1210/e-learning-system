<template>
  <div v-loading.fullscreen="isLoading">
    <div v-if="exams.length > 0">
      <div @click="getExamSolutions(exam, index)" class="exam-collapse" v-for="(exam, index) in exams" :key="index">
        <div class="exam-collapse__header">
          <h6 class="mb-0 font-h5">{{exam.exam_name}}</h6>
          <span v-if="examLoading === index">
          <font-awesome-icon :icon="['fas', 'spinner']" spin />
        </span>
          <span v-else-if="examLoading !== index && currExam != index">
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </span>
          <span v-else>
          <font-awesome-icon :icon="['fas', 'chevron-up']" />
        </span>
        </div>
        <div v-if="currExam == index" class="mt-3" @click.stop>
<!--          <div class="mb-4 d-flex flex-row-reverse" v-if="examSolutions.hasAnswer">-->
<!--            <Button-->
<!--              padding=".5rem 1rem"-->
<!--              :type="'primary-plain'"-->
<!--              :center="true"-->
<!--              text="عرض الإجابات"-->
<!--              @click.native="student ? $router.push(`/dashboard/solutions/116`) : $router.push(`/student/solutions/116`)"-->
<!--            >-->
<!--              <img src="@/assets/imgs/dashboard/vuesax-bulk-edit-2.svg" alt="" />-->
<!--            </Button>-->
<!--          </div>-->
          <div class="d-flex gap-4 flex-wrap align-items-center">
            <div class="exam-mark" v-for="(sol, index2) in examSolutions.solutions" :key="index2">
              <font-awesome-icon class="d-block m-auto mb-3" :icon="['fas', 'graduation-cap']" />
              <h6 class="font-h5 font--semibold text-center">{{sol.exam_name}}</h6>
              <span class="d-block text-center"> <span class="font-h6">الدرجة: </span> {{sol.mark}}</span>
            </div>
          </div>

          <div class="mt-4">
            <apexchart style="width: 100%" type="line" :options="options" :series="setExamSolutionsSeries(examSolutions)"></apexchart>
          </div>

        </div>
      </div>
    </div>
    <NoData v-else text="لا توجد امتحانات" />
  </div>
</template>

<script>
import NoData from '@/components/NoData.vue';
import Button from "~/components/Layouts/Button.vue";
export default {
  components:{
    Button,
    NoData
  },
  props: {
    student: {
      required: false,
    }
  },
  data() {
    return {
      exams: [],
      isLoading: true,
      examLoading: null,
      currExam: null,
      examSolutions: {},
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
    }
  },
  methods: {
    setExamSolutionsSeries(sol) {
      const solutionsMarks = sol?.solutions?.map(ele => ele.mark).reverse();
      this.options.chart.id = sol?.solutions?.[0]?.exam_name;
      this.options.xaxis.categories = solutionsMarks?.map((_, index) => `الحل  ${index + 1}`);

      return [{
        name: '',
        data: solutionsMarks
      }]
    },
    async getExamSolutions(item, index) {
      if(this.currExam === index) {
        this.currExam = null;
        return;
      }
      this.examSolutions = [];
      this.examLoading = index;

      try {
        const req = await this.$axios.get(`/student-exam-solutions`, {params: { exam_id: item.exam_id }})
        this.examSolutions = req.data;
        this.examLoading = this.currExam = index;
      } finally {
        this.examLoading = null;
      }
    },
    async getCourseExams() {
      this.isLoading = true;
      try {
        const req = await this.$axios.get(`/student-course-exams`, {params: {course_id: this.$route.query.course_id || this.$route.params.id, student_id: this.student ? this.student : null}})
        this.exams = req.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getCourseExams();
  }
}
</script>

<style lang="scss" scoped>
.exam-collapse {
  margin-bottom: 1rem;
  cursor: pointer;
  &__header {
    background: #f7f7f7;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .exam-mark {
    padding: 0 2rem ;
  }
}
</style>
