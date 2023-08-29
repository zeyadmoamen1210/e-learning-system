<template>
  <div class="selected-content">
    <div
      class="selected-content__video mb-4"
      v-if="selectedContent.type == 'VIDEO' && !selectedContentStarted"
      @click="openVideo(selectedContent)"
      role="button"
    >
      <img class="selected-content__video-photo" :src="course.image" alt="" />

      <div class="selected-content__video-title">
        <div class="d-flex gap-3 align-items-end">
          <div>
            <div class="selected-content__video-time">{{ selectedContent.time }}</div>
            <img src="@/assets/imgs/course-imgs/vuesax-broken-video-square.svg" alt="" />
          </div>
          <div>
            <h6 class="font-h5">{{ selectedContent.title }}</h6>
            <span class="font-h6"> {{ selectedContent.description }} </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="selected-content__pdf"
      v-if="selectedContent.type == 'PDF' && !selectedContentStarted"
    >
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/pdf-icon.svg" alt="" />
        <h6 class="font-h4 text-center">عنوان الملف .PDF</h6>
        <span class="d-block font--light font-h5 text-center">حجم الملف : 3ميجا</span>
        <button
          @click="selectedContentStarted = true"
          class="button button--primary mt-3"
        >
          عرض الملف
        </button>
      </div>
    </div>

    <div
      class="selected-content__pdf"
      v-if="selectedContent.type == 'EXAM' && !selectedContentStarted && !examSubmitted"
    >
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/test.svg" alt="" />
        <h6 class="font-h4 text-center">هل أنت جاهز للاختبار ؟</h6>
        <span class="d-block font--light font-h5 text-center">
          قم بالضغط إذا كنت متأكد من أنك جاهز وتريد بدأ الاختبار
        </span>
        <button
          @click="selectedContentStarted = true"
          class="button button--primary mt-3"
        >
          ابدأ الاختبار
        </button>
      </div>
    </div>

    <div
      class="selected-content__pdf"
      v-if="selectedContent.type == 'EXAM' && selectedContentStarted"
    >
      <ExamTemplate @submit="(examSubmitted = true), (selectedContentStarted = false)" />
    </div>

    <div
      v-if="
        selectedContentStarted && selectedContent.type == 'VIDEO' && selectedContent.link
      "
    >
      <iframe
        style="width: 100%; height: 50.5rem"
        :src="selectedContent.link"
        frameborder="0"
      ></iframe>
    </div>

    <div
      v-if="
        selectedContentStarted && selectedContent.type == 'PDF' && selectedContent.link
      "
    >
      <object
        style="height: 50.5rem; width: 100%"
        :data="selectedContent.link + '#toolbar=0&navpanes=0&scrollbar=0'"
        type="application/pdf"
      >
        <div class="mb-4">المتصفح الحالي لا يدعم ملفات ال PDF افتح من متصفح اخر</div>
      </object>
    </div>

    <div class="selected-content__pdf" v-if="examSubmitted">
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/tick-circle-bulk.png" alt="" />
        <h6 class="font-h4 text-center">تم تسليم الاختبار</h6>
        <span class="d-block font--light font-h5 text-center">
          أجاباتك قيد المراجعة والتصحيح سوف يتم إرسال إشعار لك بالنتيجة فور انتهاء التصحيح
        </span>
        <div class="d-flex gap-2 align-items-center justify-content-center mt-4">
          <div class="exam-template__timer d-flex align-items-center gap-2">
            <div class="d-flex gap-2 align-items-center">
              <img class="mb-0" src="@/assets/imgs/course-imgs/timer-broken.svg" alt="" />
              <span class="font-h5"> لقد استغرقت : </span>
            </div>
            <h6 class="font-h4 mb-0 exam-template__mins">04:32</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExamTemplate from "./Exam/Template.vue";
export default {
  components: {
    ExamTemplate,
  },
  props: {
    selectedContent: {
      required: false,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      selectedContentStarted: false,
      examSubmitted: false,
    };
  },
  methods: {
    openVideo(selectedContent) {
      this.selectedContentStarted = true;
    },
  },
};
</script>
