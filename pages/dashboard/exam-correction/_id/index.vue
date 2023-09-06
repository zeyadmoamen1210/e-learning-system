<template>
  <div v-loading="loading">
    <div class="d-flex gap-2 justify-content-between flex-wrap">
      <div>
        <h6 class="font-h4 font--regular">تفاصيل الأسئلة</h6>
        <p class="font--light font-h5">عرض لتفاصيل الأسئلة التي يجب تصحيحها</p>

        <div class="mt-5 d-flex gap-5 flex-wrap">
          <div v-if="$route.query.user_name">
            <span class="d-block font-h6 font--light mb-2">اسم الطالب</span>
            <h6 class="font-h5 font--regular">{{ $route.query.user_name }}</h6>
          </div>
          <div v-if="$route.query.course_name">
            <span class="d-block font-h6 font--light mb-2">اسم الكورس</span>
            <h6 class="font-h5 font--regular">{{ $route.query.course_name }}</h6>
          </div>
          <div v-if="$route.query.exam_name">
            <span class="d-block font-h6 font--light mb-2">اسم الاختبار</span>
            <h6 class="font-h5 font--regular">{{ $route.query.exam_name }}</h6>
          </div>
        </div>
      </div>
      <div>
        <Button
          @click.native="submitCorrection"
          padding="1.2rem 1.5rem"
          textClasses="font-h5 font--regular"
          type="primary"
          text="إنهاء التصحيح"
        >
        </Button>
      </div>
    </div>

    <div class="mt-5">
      <div class="mb-4" v-for="(question, index) in questions" :key="index">
        <QuestionToCorrect
          :question="question"
          @removeFromSolution="removeFromSolution"
          @setQuestionMark="setQuestionMark"
        />
      </div>
    </div>

    <ExamCorrectedSuccessfully
      :isOpened="submitCorrectionPopup"
      @close="$router.push('/dashboard/exam-correction'), (submitCorrectionPopup = false)"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import QuestionToCorrect from "@/components/Dashboard/Questions/Correct.vue";
import ExamCorrectedSuccessfully from "@/components/Dashboard/Popups/ExamCorrectedSuccessfully.vue";

export default {
  middleware: ["prevent-student"],
  layout: "dashboard",
  components: {
    Button,
    QuestionToCorrect,
    ExamCorrectedSuccessfully,
  },
  mounted() {
    this.getSolutionDetails();
  },
  methods: {
    removeFromSolution(id) {
      const index = this.solutions.findIndex((ele) => ele.id == id);
      this.solutions.splice(index, 1);
    },
    async submitCorrection() {
      if (this.solutions.length === this.questions.length) {
        this.loading = true;
        try {
          await this.$axios.post(`/correct-solutions`, {
            solutions: this.solutions,
          });
          this.submitCorrectionPopup = true;
        } catch (err) {
          this.$awn.alert("حدث خطأ ما");
        } finally {
          this.loading = false;
        }
      } else {
        this.$awn.alert("هناك أسئلة لم يتم تصحيحها");
      }
    },
    setQuestionMark(e) {
      const index = this.solutions.findIndex((ele) => ele.id == e.solution_id);
      if (index === -1) {
        this.solutions.push({
          id: e.solution_id,
          mark: e.mark,
        });
      } else {
        this.solutions[index].mark = e.mark;
      }
      console.log(this.solutions);
    },
    async getSolutionDetails() {
      this.loading = true;
      try {
        const res = await this.$axios.get(
          `/exam-solutions/${this.$route.params.id}/answers`
        );
        this.questions = res.data;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
  },
  data() {
    return {
      solutions: [],
      submitCorrectionPopup: false,
      loading: false,
      questions: [],
    };
  },
};
</script>
