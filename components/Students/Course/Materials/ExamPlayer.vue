<template>
  <div v-loading="examLoading">
    <StartExam @start="startTheExam" v-if="firstTimeToOpenTheExam" />

    <div class="selected-content__pdf" v-if="examStartedSuccessfully">
      <ExamTemplate
        @timeFinished="submitExam"
        :exam="currExam"
        @submit="confirmSubmitExamPopup = true"
      />
    </div>

    <ExamWaitingReview v-if="examIsWatingReview" />

    <ContinueSolvingYourExam
      v-if="continueSolvingExam"
      :isOpened="continueSolvingExam"
      @close="continueSolvingExam = false"
      @continue="startTheExam"
    />

    <YourExamResult
      v-if="showExamResult"
      :canSolveAgain="checkExamData.canOpen"
      :examData="checkExamData"
      @solveAgain="startTheExam"
      @showModelAnswer="showModelAnswer"
    />

    <ExamModelAnswers
      :examData="checkExamData"
      :answers="examModelAnswers"
      v-if="showExamModelAnswer"
    />

    <SubmitExamPopup
      :isOpened="confirmSubmitExamPopup"
      v-if="confirmSubmitExamPopup"
      @close="confirmSubmitExamPopup = false"
      @submit="submitExam"
      :submitExamLoading="submitExamLoading"
    />
  </div>
</template>

<script>
import ExamTemplate from "../Exam/Template.vue";
import StartExam from "../Exam/Cases/StartExam";
import ExamWaitingReview from "../Exam/Cases/WaitingReview";
import SubmitExamPopup from "../Popups/SubmitExamPopup.vue";
import YourExamResult from "../Exam/Cases/YourExamResult.vue";
import ContinueSolvingYourExam from "../Exam/Cases/ContinueSolvingYourExam";
import ExamModelAnswers from "../Exam/Cases/ExamModelAnswers";

export default {
  components: {
    ExamTemplate,
    StartExam,
    ExamWaitingReview,
    SubmitExamPopup,
    ContinueSolvingYourExam,
    YourExamResult,
    ExamModelAnswers,
  },
  props: {
    selectedContent: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      examLoading: false,
      confirmSubmitExamPopup: false,
      continueSolvingExam: false,
      examIsWatingReview: false,
      showExamModelAnswer: false,

      submitExamLoading: false,
      checkExamData: {},
      currExam: {},
      firstTimeToOpenTheExam: false,
      showExamResult: false,
      showTheModelAnswerDirectly: false,
      examStartedSuccessfully: false,
    };
  },
  mounted() {
    this.getTheExam();
  },
  methods: {
    async showModelAnswer() {
      this.examLoading = true;
      try {
        const res = await this.$axios.post(
          `/answers/${this.checkExamData?.userLastSolution?.id}/show`
        );
        this.resetExamCases();
        this.examModelAnswers = res.data;
        this.showExamModelAnswer = true;
      } catch (err) {
        this.$notify.error({
          title: "خطأ",
          message: "هناك خطأ ما",
        });
      } finally {
        this.examLoading = false;
      }
    },
    resetExamCases() {
      this.firstTimeToOpenTheExam = false;
      this.showExamResult = false;
      this.continueSolvingExam = false;
      this.showTheModelAnswerDirectly = false;
      this.confirmSubmitExamPopup = false;
      this.examIsWatingReview = false;
      this.showExamModelAnswer = false;
    },
    async submitExam() {
      this.submitExamLoading = true;
      try {
        const res = await this.$axios.post(
          `/exam-solutions/${this.currExam?.openedSolution?.id}/close`
        );
        this.confirmSubmitExamPopup = false;
        this.examStartedSuccessfully = false;

        this.getTheExam();
        this.$notify({
          title: "تم بنجاح",
          message: "تم تسليم الإمتحان",
          type: "success",
        });
      } catch (err) {
        this.$notify.error({
          title: "خطأ",
          message: "هناك خطأ ما!",
        });
      } finally {
        this.submitExamLoading = false;
      }
    },
    async getTheExam() {
      this.examLoading = true;
      try {
        const res = await this.$axios.get(`/check-exams/${this.selectedContent?.id}`);
        this.checkExamData = res.data;
        this.resetExamCases();

        // user should waiting the teacher review
        if (
          !this.checkExamData.canOpen &&
          this.checkExamData.waiting_correct &&
          this.checkExamData.userLastSolution?.is_closed === 1
        ) {
          this.examIsWatingReview = true; // done
          return;
        }

        // user will solve it for first time
        if (this.checkExamData.canOpen && this.checkExamData.userLastSolution === null) {
          this.firstTimeToOpenTheExam = true; // done
        }
        // user can show the answer or sove it again
        if (
          this.checkExamData.userLastSolution?.answers_shown === 0 &&
          this.checkExamData.userLastSolution?.is_closed === 1
        ) {
          this.showExamResult = true;
        }

        // user can continue solve the exam
        if (
          this.checkExamData.canOpen &&
          this.checkExamData.userLastSolution &&
          this.checkExamData.userLastSolution?.is_closed === 0
        ) {
          this.continueSolvingExam = true; // done
        }

        // user solve it and shows the answers
        if (
          !this.checkExamData.canOpen &&
          this.checkExamData.userLastSolution?.answers_shown === 1 &&
          this.checkExamData.userLastSolution?.is_closed === 1
        ) {
          this.showModelAnswer();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.examLoading = false;
      }
    },

    async startTheExam() {
      if (!this.checkExamData.canOpen) {
        this.$notify.error({
          title: "خطأ",
          message: "هذا الامتحان تم حله من قبل",
        });
        return;
      }
      this.resetExamCases();
      this.examLoading = true;
      try {
        const res = await this.$axios.post(`/exams/${this.selectedContent?.id}/start`);
        this.currExam = res.data;
        this.examStartedSuccessfully = true;
      } catch (err) {
        console.log(err);
      } finally {
        this.examLoading = false;
      }
    },
  },
};
</script>
