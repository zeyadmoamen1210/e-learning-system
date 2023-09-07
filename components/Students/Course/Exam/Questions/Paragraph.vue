<template>
  <div class="paragraph" v-viewer>
    <p class="font--light">
      {{ question.title }}
    </p>
    <div v-if="question.image" class="question-main-img">
      <img @click="$emit('clickToImg')" :src="question.image" alt="" />
    </div>

    <div class="row mt-5 mb-5" v-if="!showAnswers">
      <el-input
        type="textarea"
        :rows="5"
        v-model="selectedAnswerVar"
        @blur="onBlur"
        placeholder="الإجابة"
      ></el-input>
    </div>
    <div class="row mt-5 mb-5" v-else>
      <div>
        <span class="answer-box__your-ans-title d-block">إجابتك : </span>
        <p class="mb-0">
          {{ selectedAnswerVar }}
        </p>
      </div>
      <div>
        <span class="answer-box__your-ans-title d-block">الإجابة النموذجية : </span>
        <p class="mb-0">
          {{ question.correct_answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      required: true,
    },
    selectedAnswer: {
      required: true,
    },
    showAnswers: {
      default: false,
    },
  },
  data() {
    return {
      selectedAnswerVar: this.selectedAnswer,
    };
  },
  methods: {
    onBlur() {
      this.$emit("answer", this.selectedAnswerVar);
    },
  },
  destroyed() {
    this.selectedAnswerVar = null;
  },
};
</script>
