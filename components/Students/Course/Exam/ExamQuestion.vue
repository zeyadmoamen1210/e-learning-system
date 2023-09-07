<template>
  <div class="mb-3">
    <span v-if="showAnswers" class="answer-box__num"> {{ questionIndex + 1 }} </span>
    <h6 v-else class="font-h4 mb-3">السؤال رقم {{ questionIndex + 1 }}</h6>
    <ChooseQuestion
      @answer="setAnswer"
      @clickToImg="$emit('clickToImg')"
      :showAnswers="showAnswers"
      v-if="question.type?.includes('choose')"
      :question="question"
      :solutionAnswers="solutionAnswers"
      :selectedAnswer="getQuestionSelectedAnswer()"
    />
    <ParagraphQuestion
      @answer="setAnswer"
      :showAnswers="showAnswers"
      v-if="question.type == 'paragraph'"
      :question="question"
      :selectedAnswer="getQuestionSelectedAnswer()"
    />
  </div>
</template>

<script>
import ChooseQuestion from "./Questions/Choose.vue";
import ParagraphQuestion from "./Questions/Paragraph.vue";
export default {
  components: {
    ChooseQuestion,
    ParagraphQuestion,
  },
  props: {
    showAnswers: {
      default: false,
    },
    questionIndex: {
      required: true,
    },
    question: {
      required: true,
      type: Object,
    },
    openedSolution: {
      required: true,
    },
    solutionAnswers: {
      required: true,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    getQuestionSelectedAnswer() {
      const solutionIndex = this.solutionAnswers.findIndex(
        (ele) => ele.question_id === this.question?.pivot?.question_id
      );
      return solutionIndex != -1
        ? this.solutionAnswers[solutionIndex]?.selected_answer
        : null;
    },
    setTheAnswerLocally(e) {
      // set the answer locally
      const index = this.solutionAnswers.findIndex(
        (ele) => ele.question_id === this.question?.pivot?.question_id
      );
      if (index != -1) {
        this.solutionAnswers[index].selected_answer = e;
      } else {
        this.solutionAnswers.push({
          question_id: this.question?.pivot?.question_id,
          selected_answer: e,
        });
      }
    },
    async setAnswer(e) {
      if (this.showAnswers) {
        return;
      }
      this.setTheAnswerLocally(e);

      this.loading = true;
      try {
        const res = this.$axios.post(`/answers/${this.openedSolution}/submit`, {
          question_id: this.question?.pivot?.question_id,
          selected_answer: e,
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
