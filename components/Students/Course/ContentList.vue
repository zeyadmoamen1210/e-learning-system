<template>
  <div class="content-list">
    <!-- Preview -->
    <LessonCard :lessonMaterial="preview" @click.native="$emit('showPreview', preview)" />

    <div
      v-for="(lesson, i) in lessons"
      :key="i"
      @click="activeTab == i ? (activeTab = null) : (activeTab = i)"
    >
      <section class="d-flex gap-2 justify-content-between py-3 my-4 lesson-tab">
        <div class="d-flex gap-2 align-items-center">
          <img src="@/assets/imgs/course-imgs/eye-lock-linear.svg" alt="" />
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
  </div>
</template>

<script>
import LessonCard from "./LessonCard.vue";
export default {
  components: {
    LessonCard,
  },
  props: {
    lessons: {
      required: true,
      type: Array,
    },
    preview: {
      required: true,
      type: Object,
    },
  },
  methods: {
    selectContent(item) {
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
