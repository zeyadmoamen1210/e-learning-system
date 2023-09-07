<template>
  <div v-loading.fullscreen="loading">
    <div v-show="!loading" class="d-flex flex-column">
      <CourseHeader
        @reload="getOneCourse"
        :course="course"
        :isSubscribedIn="course.is_subscribed"
        :class="course.is_subscribed && 'order-2'"
      />

      <div class="container mt-5 mb-5" :class="course.is_subscribed && 'order-1'">
        <div class="d-flex flex-row-reverse mb-3 d-none d-lg-flex">
          <Button
            padding="1rem 2rem"
            :type="'null'"
            :center="true"
            :text="showMenu ? 'إخفاء القائمة' : 'إظهار القائمة'"
            text-classes="font-h5 font--regular"
            @click.native="showMenu = !showMenu"
          >
            <img src="@/assets/imgs/dashboard/vuesax-bulk-frame.svg" alt="" />
          </Button>
        </div>
        <div class="row">
          <div :class="showMenu ? 'col-lg-8' : 'col-lg-12'">
            <SelectedContent
              ref="selectedContent"
              :selectedContent="selectedContent"
              :course="course"
              v-if="refreshSelectedContent"
            />
          </div>
          <div class="col-lg-4" v-if="showMenu">
            <ContentList
              :course="course"
              @selectContent="selectContent"
              @showPreview="showPreview"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseHeader from "@/components/Students/Course/Header.vue";
import SelectedContent from "@/components/Students/Course/SelectedContent.vue";
import ContentList from "@/components/Students/Course/ContentList.vue";
import Button from "@/components/Layouts/Button.vue";

export default {
  name: "CoursePreview",
  middleware: ["not-admin"],
  auth: false,
  mounted() {
    this.getOneCourse();
  },
  components: {
    CourseHeader,
    SelectedContent,
    ContentList,
    Button,
  },
  methods: {
    async getOneCourse() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/courses/${this.$route.params.id}`);
        this.course = res.data;
        this.selectedContent.link = this.course.promo;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async selectContent(content) {
      this.refreshSelectedContent = false;
      this.selectedContent = content;
      await this.$nextTick();
      this.refreshSelectedContent = true;

      if (process.client) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    async showPreview() {
      this.refreshSelectedContent = false;
      this.selectedContent = {
        title: "فيديو تعريفي للكورس",
        description: "فيديو تعريفي للكورس",
        type: "VIDEO",
        link: this.course.promo,
      };
      await this.$nextTick();
      this.refreshSelectedContent = true;
    },
  },
  data() {
    return {
      course: {},
      isHasOffer: true,
      selectedContent: {
        title: "فيديو تعريفي للكورس",
        description: "فيديو تعريفي للكورس",
        type: "VIDEO",
        link: this.course?.promo,
      },
      loading: true,
      refreshSelectedContent: true,
      showMenu: true,
    };
  },
};
</script>
