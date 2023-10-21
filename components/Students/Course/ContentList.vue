<template>
  <div class="content-list" v-loading.fullscreen="loading">
    <!-- Preview -->
    <LessonCard
      :is_subscribed="false"
      :lessonMaterial="null"
      @click.native="$emit('showPreview')"
    />

    <template v-if="course.lessons?.length > 0">
      <div
        v-for="(lesson, i) in course.lessons"
        :key="i"
        @click="activeTab == i ? (activeTab = null) : (activeTab = i)"
      >
        <section class="d-flex gap-2 justify-content-between py-3 my-4 lesson-tab">
          <div class="d-flex gap-2 align-items-center">
            <img
              v-if="!course.is_subscribed"
              src="@/assets/imgs/course-imgs/eye-lock-linear.svg"
              alt=""
            />
            <h6 class="font-h5 mb-0">{{ lesson.name }}</h6>
          </div>
          <div>
            <transition>
              <img
                v-if="activeTab === i"
                src="@/assets/imgs/course-imgs/vuesax-broken-arrow-bottom.svg"
                alt=""
              />

              <img
                v-else
                src="@/assets/imgs/course-imgs/vuesax-broken-arrow-bottom-2.svg"
                alt=""
              />
            </transition>
          </div>
        </section>

        <div v-if="activeTab == i" @click.stop>
          <template v-if="!course.is_subscribed">
            <div v-for="(item, index2) in lesson.sections" :key="index2">
              <LessonCard
                @click.native="selectContent(item)"
                :lessonMaterial="item"
                :is_subscribed="false"
              />
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index2) in lesson.materials" :key="index2">
              <LessonCard
                @click.native="selectContent(item)"
                :lessonMaterial="item"
                :is_subscribed="true"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <NoData text="لا يوجد دروس مُتاحة" />
    </template>


    <UserCanWatchThisVideo :loading="submitVideoLoading" :video-response="videoCheckResponse" :is-opened="userCanWatchThisVideo" @close="userCanWatchThisVideo = false" v-if="userCanWatchThisVideo" @submit="submitVideo" />
    <UserCanNotWatchThisVideo :video-response="videoCheckResponse" :is-opened="userCanNotWatchThisVideo" @close="userCanNotWatchThisVideo = false" v-if="userCanNotWatchThisVideo" @submit="notOpenVideo" />
  </div>
</template>

<script>
import UserCanWatchThisVideo from '@/components/Students/Course/Popups/UserCanWatchThisVideo.vue';
import UserCanNotWatchThisVideo from '@/components/Students/Course/Popups/UserCanNotWatchThisVideo.vue';
import LessonCard from "./LessonCard.vue";
import NoData from "@/components/NoData.vue";
export default {
  components: {
    LessonCard,
    NoData,
    UserCanWatchThisVideo,
    UserCanNotWatchThisVideo
  },
  props: {
    course: {
      required: true,
    },
    selectedContent: {
      required: false,
    }
  },
  methods: {
    notOpenVideo() {
      this.userCanNotWatchThisVideo = false;
      // this.$emit("selectContent", {...this.currVideo, openVideo: false});
    },
    async submitVideo() {
      this.submitVideoLoading = true;
      try {
        const res = await this.$axios.post(`/video-views`, {video_id: this.currVideo.id})
        this.$emit("selectContent", {...this.currVideo, openVideo: true});
        this.userCanWatchThisVideo = false;
      } catch(err) {
        console.log(err);
        this.$awn.alert("هناك خطأ ما");
      } finally {
        this.submitVideoLoading = false;
      }

    },
    selectContent(item) {
      if (!this.$auth.loggedIn) {
        this.$awn.alert("قم بتسجيل الدخول اولاً");
        return;
      }
      if (!this.course.is_subscribed) {
        this.$awn.alert("أنت غير مُشترك في هذا الكورس");
        return;
      }

      if(this.selectedContent.id === item.id) {
        return;
      }
      if(item.type === `VIDEO`) {
        this.checkThisVideo(item);
        return;
      }
      this.$emit("selectContent", item);
    },
    async checkThisVideo(video) {
      this.loading = true;
      this.currVideo = video;
      this.userCanWatchThisVideo = this.userCanNotWatchThisVideo =  false;
      try {
        const res = await this.$axios.get(`/video-check/${video.id}`)
        if(res.data.userViewCount < res.data.viewLimit) {
          this.userCanWatchThisVideo = true;
          this.videoCheckResponse = res.data;
        }
      } catch (err) {
        if(err.response.status === 403) {
          this.userCanNotWatchThisVideo = true;
          this.videoCheckResponse = err.response.data;
        }
      } finally {
        this.loading = false;
      }
    },
  },
  data() {
    return {
      loading: false,
      submitVideoLoading: false,
      activeTab: null,
      currVideo: {},
      userCanWatchThisVideo: false,
      userCanNotWatchThisVideo: false,
      videoCheckResponse: {}
    };
  },
};
</script>
