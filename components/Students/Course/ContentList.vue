<template>
  <div class="content-list">
    <!-- Preview -->
    <LessonCard :lessonMaterial="null" @click.native="$emit('showPreview')" />
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
          <div v-for="(item, index2) in lesson.materials" :key="index2">
            <LessonCard @click.native="selectContent(item)" :lessonMaterial="item" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <NoData text="لا يوجد دروس مُتاحة" />
    </template>
  </div>
</template>

<script>
import LessonCard from "./LessonCard.vue";
import NoData from "@/components/NoData.vue";
export default {
  components: {
    LessonCard,
    NoData,
  },
  props: {
    course: {
      required: true,
    },
  },
  methods: {
    selectContent(item) {
      if (!this.$auth.loggedIn) {
        this.$notify.error({
          title: "خطأ",
          message: "قم بتسجيل الدخول اولاً",
        });
        return;
      }
      if (!this.course.is_subscribed) {
        this.$notify.error({
          title: "خطأ",
          message: "أنت غير مُشترك في هذا الكورس",
        });
        return;
      }
      this.$emit("selectContent", item);
    },
  },
  data() {
    return {
      activeTab: null,
    };
  },
};
</script>
