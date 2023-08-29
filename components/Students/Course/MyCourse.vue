<template>
  <div class="my-course">
    <div>
      <img class="my-course__img" :src="course.image" alt="" />
    </div>
    <div class="flex-fill">
      <h6 class="font-h5 mb-4 font--semibold mt-2">{{ course.name }}</h6>
      <div class="d-flex gap-2 align-items-center mb-4 flex-wrap">
        <div class="d-flex gap-2 align-items-center">
          <div>
            <img src="@/assets/imgs/course-imgs/timer-broken.png" alt="" />
          </div>
          <h6 class="mb-0 font-h5 font--light">مدة الكورس :</h6>
        </div>
        <h6 class="mb-0 font-h5 font--light font--orange">
          {{ minutesToHours(course.duration) }} ساعات
        </h6>
      </div>

      <div>
        <button
          @click="$router.push(`/student/course/${course.id}/preview`)"
          class="button button--primary-plain w-100 d-flex gap-3 justify-content-center"
        >
          <span>عرض تفاصيل الكورس</span>
          <span>
            <img src="@/assets/imgs/course-imgs/arrow-left-linear.svg" alt="" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      required: true,
    },
  },
};
</script>
