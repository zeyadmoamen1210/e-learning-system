<template>
  <div class="paragraph" v-viewer>
    <p class="font--light">
      {{ question.title }}
    </p>
    <div v-if="question.image" class="question-main-img">
      <img :src="question.image" alt="" />
    </div>

    <div class="row mt-5 mb-5">
      <el-input
        type="textarea"
        :rows="5"
        v-model="selectedAnswerVar"
        @blur="onBlur"
        placeholder="الإجابة"
      ></el-input>
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
