<template>
  <div class="selected-content">
    <div
      class="selected-content__video"
      v-if="selectedContent.type == 'video' && !selectedContentStarted"
    >
      <img
        class="selected-content__video-photo"
        src="@/assets/imgs/course-imgs/course-img.jpeg"
        alt=""
      />

      <div class="selected-content__video-title">
        <div
          role="button"
          class="d-flex gap-3 align-items-end"
          @click="openVideo(selectedContent)"
        >
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
      v-if="selectedContent.type == 'pdf' && !selectedContentStarted"
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
      v-if="selectedContent.type == 'test' && !selectedContentStarted"
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

    <div v-if="selectedContentStarted && selectedContent.type == 'video'">
      <iframe
        style="width: 100%; height: 50.5rem"
        :src="selectedContent.link"
        frameborder="0"
      ></iframe>
    </div>

    <div v-if="selectedContentStarted && selectedContent.type == 'pdf'">
      <object
        style="height: 50.5rem; width: 100%"
        :data="selectedContent.link"
        type="application/pdf"
      >
        Your browser does not support PDF files.
        <a :href="selectedContent.link">Download the file instead</a>
      </object>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedContent: {
      required: true,
    },
  },
  data() {
    return {
      selectedContentStarted: false,
    };
  },
  methods: {
    openVideo(selectedContent) {
      this.selectedContentStarted = true;
    },
  },
};
</script>
