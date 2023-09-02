<template>
  <div>
    <div
      v-if="!selectedContentStarted"
      class="selected-content__video mb-4"
      @click="openVideo()"
      role="button"
    >
      <img class="selected-content__video-photo" :src="course.image" alt="" />

      <div class="selected-content__video-title">
        <div class="d-flex gap-3 align-items-end flex-wrap">
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

    <template v-if="!invalidVideoUrl">
      <div v-if="selectedContentStarted && selectedContent.link">
        <iframe
          style="width: 100%; height: 50.5rem"
          :src="customizedVideoUrl(selectedContent.link)"
          frameborder="0"
        ></iframe>
      </div>

      <div v-if="selectedContentStarted && selectedContent.content">
        <iframe
          style="width: 100%; height: 50.5rem"
          :src="customizedVideoUrl(selectedContent.content?.url)"
          frameborder="0"
        ></iframe>
      </div>
    </template>

    <div v-else class="d-flex justify-content-center flex-column">
      <h5 class="text-center text-danger font-h4 mt-5">خطأ</h5>
      <p class="text-center">رابط الفيديو غير صحيح</p>
    </div>
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
      invalidVideoUrl: false,
    };
  },
  methods: {
    customizedVideoUrl(videoUrl) {
      try {
        let url = new URL(videoUrl);
        if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
          let videoId = url.searchParams.get("v");
          return "https://www.youtube.com/embed/" + videoId;
        } else if (url.hostname.includes("vimeo.com")) {
          let videoId = url.pathname.slice(1);
          return "https://player.vimeo.com/video/" + videoId;
        }
      } catch (err) {
        this.invalidVideoUrl = true;
        return "";
      }
      this.invalidVideoUrl = true;
      // Return an empty string or handle unsupported URLs as desired
      return "";
    },
    openVideo() {
      this.selectedContentStarted = true;
    },
  },
};
</script>
