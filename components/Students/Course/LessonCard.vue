<template>
  <div class="content-list__preview lesson">
    <div class="d-flex gap-3 align-items-center lesson__one">
      <div>
        <img
          v-if="lessonMaterial.type === 'video'"
          src="@/assets/imgs/course-imgs/video.svg"
          alt=""
        />

        <img
          v-if="lessonMaterial.type === 'pdf'"
          src="@/assets/imgs/course-imgs/pdf.svg"
          alt=""
        />

        <img
          v-if="lessonMaterial.type === 'test'"
          src="@/assets/imgs/course-imgs/exam.svg"
          alt=""
        />
      </div>
      <div class="overflow-hidden">
        <h5 class="font-h5 font--regular content-list__description">
          {{ lessonMaterial.title }}
        </h5>
        <span class="font-h5 light-font content-list__description">
          {{ lessonMaterial.description }}
        </span>
      </div>
    </div>
    <div v-if="lessonMaterial.type === 'video'" class="lesson__time">
      {{ lessonMaterial.time }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lessonMaterial: {
      required: true,
    },
  },
};
</script>
