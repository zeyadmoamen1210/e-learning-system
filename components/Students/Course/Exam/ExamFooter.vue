<template>
  <div class="d-flex flex-row-reverse gap-3 flex-wrap mb-4">
    <button
      v-if="questionIndex < questionsLenght - 1"
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
</template>

<script>
export default {
  props: {
    questionIndex: {
      required: true,
    },
    questionsLenght: {
      required: true,
      type: Number,
    },
  },
};
</script>
