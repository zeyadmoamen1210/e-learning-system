<template>
  <div>
    <Button
      @click.native="addVideoPopup = true"
      type="success-plain"
      text="إضافة فيديو"
      padding="1rem 2.5rem"
    >
      <template>
        <img src="@/assets/imgs/dashboard/video-square-broken-3.svg" alt="" />
      </template>
    </Button>

    <div class="row">
      <div class="col-md-6" v-for="(video, index) in videos" :key="index">
        <div class="lesson-video">
          <div>
            <img src="@/assets/imgs/dashboard/lesson-img-video.png" alt="" />
          </div>
          <div class="flex-fill">
            <h6 class="font-h5 lesson-video__title">{{ video.title }}</h6>
            <p class="lesson-video__desc font--light font-h6 mb-0">
              {{ video.description }}
            </p>
            <a target="_blank" class="font-h6" :href="video.content?.url">رابط الفيديو</a>
            <span class="d-block font-h6 font--orange">
              {{ video.content.duration }} دقيقة
            </span>
            <span class="d-block font-h6 font--primary">
              {{ video.content.view_limit }} مرات مشاهدة
            </span>
          </div>
        </div>
      </div>
    </div>

    <AddVideoPopup
      :isOpened="addVideoPopup"
      :lessonId="lessonId"
      :course="course"
      @close="addVideoPopup = false"
      @added="$emit('reloadCourse')"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AddVideoPopup from "@/components/Dashboard/Popups/AddVideo.vue";

export default {
  components: {
    Button,
    AddVideoPopup,
  },
  props: {
    videos: {
      required: true,
    },
    lessonId: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      addVideoPopup: false,
    };
  },
};
</script>
