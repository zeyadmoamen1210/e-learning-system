<template>
  <div class="content-list__preview lesson">
    <div class="d-flex gap-3 align-items-center lesson__one">
      <div v-if="lessonMaterial">
        <img
          v-if="lessonMaterial.type === 'VIDEO'"
          src="@/assets/imgs/course-imgs/video.svg"
          alt=""
        />

        <img
          v-if="lessonMaterial.type === 'PDF'"
          src="@/assets/imgs/course-imgs/pdf.svg"
          alt=""
        />

        <img
          v-if="lessonMaterial.type === 'EXAM'"
          src="@/assets/imgs/course-imgs/exam.svg"
          alt=""
        />
      </div>
      <div v-else>
        <img src="@/assets/imgs/course-imgs/video.svg" alt="" />
      </div>
      <div class="overflow-hidden" v-if="lessonMaterial">
        <h5 class="font-h5 font--regular content-list__description">
          {{ lessonMaterial.title }}
        </h5>
        <span class="font-h5 light-font content-list__description">
          {{ lessonMaterial.description }}
        </span>
      </div>
      <div class="overflow-hidden" v-else>
        <h5 class="font-h5 font--regular content-list__description">الفيديو التعريفي</h5>
        <span class="font-h5 light-font content-list__description">
          الفيديو التعريفي للكورس
        </span>
      </div>
    </div>
    <div
      v-if="
        lessonMaterial &&
        lessonMaterial.type === 'VIDEO' &&
        lessonMaterial.content &&
        lessonMaterial.content.duration
      "
      class="lesson__time"
    >
      {{ formatMinutes(lessonMaterial.content.duration) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lessonMaterial: {
      required: true,
    },
    is_subscribed: {
      required: true,
    },
  },
};
</script>
