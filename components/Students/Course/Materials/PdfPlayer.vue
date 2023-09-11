<template>
  <div>
    <div class="selected-content__pdf" v-if="!selectedContentStarted">
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/pdf-icon.svg" alt="" />
        <h6 class="font-h4 text-center"> {{selectedContent.title}} </h6>
<!--        <span class="d-block font&#45;&#45;light font-h5 text-center">حجم الملف : 3ميجا</span>-->
        <button
          @click="selectedContentStarted = true"
          class="button button--primary mt-4"
        >
          عرض الملف
        </button>
      </div>
    </div>

    <template v-if="selectedContentStarted">
      <div v-if="selectedContent.link">
        <object
          style="height: 50.5rem; width: 100%"
          :data="selectedContent.link + '#toolbar=0&navpanes=0&scrollbar=0'"
          type="application/pdf"
        >
          <div class="mb-4">المتصفح الحالي لا يدعم ملفات ال PDF افتح من متصفح اخر</div>
        </object>
      </div>

      <div v-if="selectedContent.content">
        <object
          style="height: 50.5rem; width: 100%"
          :data="selectedContent.content?.url + '#toolbar=0&navpanes=0&scrollbar=0'"
          type="application/pdf"
        >
          <div class="mb-4">المتصفح الحالي لا يدعم ملفات ال PDF افتح من متصفح اخر</div>
        </object>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    selectedContent: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      selectedContentStarted: false,
    };
  },
};
</script>
