<template>
  <div v-loading="loading">
    <CourseHeader :course="course" :isSubscribedIn="course.is_subscribed" />

    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8">
          <SelectedContent
            ref="selectedContent"
            :selectedContent="selectedContent"
            :course="course"
          />
        </div>
        <div class="col-lg-4">
          <ContentList
            @selectContent="selectContent"
            @showPreview="showPreview"
            :course="course"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseHeader from "@/components/Students/Course/Header.vue";
import SelectedContent from "@/components/Students/Course/SelectedContent.vue";
import ContentList from "@/components/Students/Course/ContentList.vue";

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
    selectContent(content) {
      this.$refs.selectedContent.selectedContentStarted = false;

      this.$refs.selectedContent.examSubmitted = false;

      this.selectedContent = content;
    },
    showPreview() {
      this.$refs.selectedContent.selectedContentStarted = false;

      this.$refs.selectedContent.examSubmitted = false;

      this.selectedContent = {
        title: "فيديو تعريفي للكورس",
        description: "فيديو تعريفي للكورس",
        type: "VIDEO",
        link: "dfd",
      };
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
        link: "dfd",
      },
      loading: false,
    };
  },
};
</script>
