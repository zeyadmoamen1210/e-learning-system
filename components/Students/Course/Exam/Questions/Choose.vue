<template>
  <div class="choose" v-viewer>
    <p class="font--light">
      {{ question.title }}
    </p>
    <div v-if="question.image" class="question-main-img">
      <img :src="question.image" alt="" />
    </div>
    <div class="row mt-5">
      <div
        @click="(selectedAnswerVar = index), $emit('answer', index)"
        class="col-md-6 mb-4"
        v-for="(item, index) in question.answers"
        :key="index"
      >
        <div
          class="choose-item"
          :class="selectedAnswerVar == index ? 'selected-item' : ''"
        >
          <div class="choose-item__header">
            <span> {{ index + 1 }} </span>
            <h6
              v-if="question.type === 'choose'"
              class="font-h5 mb-0 font--light font--regular"
            >
              {{ item }}
            </h6>
            <h6 v-else class="font-h5 mb-0 font--light font--regular">
              الإجابة رقم {{ index + 1 }}
            </h6>
          </div>
          <div v-if="question.type == 'choose_image'" class="choose-item__img">
            <img :src="item" alt="" />
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
  },
  data() {
    return {
      selectedAnswerVar: this.selectedAnswer != null ? +this.selectedAnswer : null,
    };
  },
  created() {
    console.log(
      this.selectedAnswer != null ? +this.selectedAnswer : null,
      this.selectedAnswer
    );
  },
  methods: {},
  destroyed() {
    this.selectedAnswerVar = null;
  },
};
</script>
