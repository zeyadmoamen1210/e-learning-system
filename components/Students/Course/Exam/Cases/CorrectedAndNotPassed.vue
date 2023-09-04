<template>
  <div class="selected-content__pdf">
    <div class="selected-content__pdf-inner">
      <img src="@/assets/imgs/course-imgs/51.png" alt="" />
      <h6 class="font-h4 text-center">لقد انتهيت من الاختبار</h6>
      <span class="d-block font--light font-h5 text-center">
        النسبة التي حصلت عليها من الاختبار
      </span>
      <div class="">
        <h6 class="text-danger text-center font-h3 mb-0 font--bold mt-3">
          {{ Number((points * 100) / totalMarks).toFixed(2) }}%
        </h6>
      </div>

      <div class="d-flex gap-2 align-item-center flex-wrap justify-content-center">
        <button @click="$emit('showModelAnswer')" class="button button--primary mt-3">
          عرض إجاباتي
        </button>
        <button
          v-if="canSolveAgain"
          @click="$emit('solveAgain')"
          class="button button--primary mt-3"
        >
          إعادة الإمتحان
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    points: {
      required: true,
    },
    totalMarks: {
      required: true,
    },
    canSolveAgain: {
      required: true,
    },
  },
};
</script>
