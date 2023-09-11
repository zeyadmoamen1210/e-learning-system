<template>
  <div class="paragraph" v-viewer>
    <p class="font--light" v-html="question.title">
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
      <div class="mt-3">
        <AttachPhoto
          title="صورة للإجابة"
          @getPhoto="getAnswerPhoto"
          :image="answerPhoto"
        />
      </div>
    </div>
    <div class="row mt-5 mb-5" v-else  v-viewer>
      <div>
        <span class="answer-box__your-ans-title d-block">إجابتك : </span>
        <p class="mb-3">
          {{ selectedAnswerVar }}
        </p>
        <div v-if="answerPhoto">
          <img class="question-img" :src="answerPhoto" alt="">
        </div>
      </div>
      <div class="mt-3">
        <span class="answer-box__your-ans-title d-block">الإجابة النموذجية : </span>
        <p class="mb-0" v-html="question.correct_answer">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AttachPhoto from "~/components/Layouts/AttachPhoto.vue";

export default {
  components: {AttachPhoto},
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
      selectedAnswerVar: this.selectedAnswer?.selected_answer,
      answerPhoto: this.selectedAnswer?.answer_image,
    };
  },
  methods: {
    getAnswerPhoto(e) {
      this.answerPhoto = e;
      this.$emit("answer", {
        selected_answer: this.selectedAnswerVar,
        answer_image: this.answerPhoto
      });
    },
    onBlur() {
      this.$emit("answer", {
        selected_answer: this.selectedAnswerVar,
        answer_image: this.answerPhoto
      });
    },
  },
  destroyed() {
    this.selectedAnswerVar = null;
  },
};
</script>
