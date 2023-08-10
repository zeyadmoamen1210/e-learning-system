<template>
  <div class="choose">
    <p class="font--light">
      {{ question.title }}
    </p>

    <div class="row mt-5">
      <div
        @click="selectedAnswer = index"
        class="col-md-6 mb-4"
        v-for="(item, index) in question.items"
        :key="index"
      >
        <div class="choose-item" :class="selectedAnswer === index ? 'selected-item' : ''">
          <div class="choose-item__header">
            <span> {{ index + 1 }} </span>
            <h6 class="font-h5 mb-0 font--light font--regular">{{ item.title }}</h6>
          </div>
          <div class="choose-item__img">
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-row-reverse gap-3 flex-wrap mb-4">
      <button
        v-if="questionIndex < 14"
        class="button button--primary d-flex gap-3 justify-content-center align-items-center px-5 py-3"
        @click="$emit('goNext')"
      >
        <span>التالي</span>
        <img src="@/assets/imgs/course-imgs/arrow-left-linear-white.svg" alt="" />
      </button>

      <button
        v-else
        class="button button--primary d-flex gap-3 justify-content-center align-items-center px-5 py-3"
        @click="$emit('submit')"
      >
        <span>تسليم الامتحان</span>
        <img src="@/assets/imgs/course-imgs/arrow-left-linear-white.svg" alt="" />
      </button>

      <button
        @click="$emit('goPrev')"
        class="button button--linear d-flex gap-3 justify-content-center align-items-center px-5 py-3"
      >
        <img src="@/assets/imgs/course-imgs/arrow-left-linear-grey.svg" alt="" />
        <span class="font--light">السابق</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      required: true,
    },
    questionIndex: {
      required: true,
    },
  },
  data() {
    return {
      selectedAnswer: 0,
    };
  },
};
</script>
