<template>
  <div class="choose" v-viewer>
    <p class="font--light" v-html="question.title">
    </p>
    <div v-if="question.image" class="question-main-img">
      <img @click="$emit('clickToImg')" :src="question.image" alt="" />
    </div>
    <div class="row mt-5">
      <div
        @click="setAnswer(index)"
        class="col-md-6 mb-4"
        v-for="(item, index) in question.answers"
        :key="index"
      >
        <div class="choose-item" :class="chooseItemClass(index)">
          <div class="choose-item__header">
            <span> {{ index + 1 }} </span>
            <h6
              v-if="question.type === 'choose'"
              class="font-h5 mb-0 font--light font--regular"
              v-html="item"
            >
            </h6>
            <h6 v-else class="font-h5 mb-0 font--light font--regular">
              الإجابة رقم {{ index + 1 }}
            </h6>
          </div>
          <div v-if="question.type == 'choose_image'" class="choose-item__img">
            <img :src="item" alt="" @click="$emit('clickToImg')" />
          </div>
        </div>
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
    solutionAnswers: {
      required: false,
    },
  },
  data() {
    return {
      selectedAnswerVar: this.selectedAnswer != null ? +this.selectedAnswer?.selected_answer : null,
    };
  },

  methods: {
    chooseItemClass(index) {
      if (!this.showAnswers) {
        return this.selectedAnswerVar == index ? "selected-item" : "";
      }
      return [
        this.selectedAnswerVar == index ? "selected-item" : "",
        this.question.correct_answer == index
          ? "correct-item"
          : this.getMyAnswer(this.question) == index
          ? "wrong-item"
          : "",
      ];
    },
    getMyAnswer(item) {
      return this.solutionAnswers.find((ele) => {
        return ele.question_id === item?.pivot?.question_id;
      })?.selected_answer;
    },
    setAnswer(index) {
      if (this.showAnswers) {
        return;
      }
      this.selectedAnswerVar = index;
      this.$emit("answer", {
        selected_answer: index,
        answer_image: null
      });
    },
  },
  destroyed() {
    this.selectedAnswerVar = null;
  },
};
</script>
