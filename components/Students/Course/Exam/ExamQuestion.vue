<template>
  <div>
    <h6 class="font-h4 mb-3">السؤال رقم {{ questionIndex + 1 }}</h6>

    <ChooseQuestion
      @goNext="$emit('goNext')"
      @goPrev="$emit('goPrev')"
      @submit="$emit('submit')"
      v-if="question.type == 'choose'"
      :question="question"
      :questionIndex="questionIndex"
    />
  </div>
</template>

<script>
import ChooseQuestion from "./Questions/Choose.vue";
export default {
  components: {
    ChooseQuestion,
  },
  props: {
    questionIndex: {
      required: true,
    },
    question: {
      required: true,
      type: Object,
    },
  },
};
</script>
