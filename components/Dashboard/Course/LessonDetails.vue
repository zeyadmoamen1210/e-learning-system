<template>
  <div>
    <div>
      <h6 class="font-h6 text-primary mb-4">محتوي الكورس</h6>
    </div>
    <div class="d-flex gap-3 mb-4 flex-wrap">
      <div v-for="(lesson, index) in course.lessons" :key="index">
        <Button
          padding="1.3rem 2.5rem"
          @click.native="activeLesson = index"
          :type="activeLesson === index ? 'primary' : 'primary-plain'"
          :text="lesson.name"
        ></Button>
      </div>
      <div>
        <Button
          @click.native="addLessonPopup = true"
          padding="1.3rem 2.5rem"
          :type="'text-primary'"
          :text="'إضافة درس جديد'"
        >
          <template>
            <img src="@/assets/imgs/dashboard/add-circle-bulk-2.svg" alt="" />
          </template>
        </Button>
      </div>
    </div>
    <div class="mb-3" v-if="course.lessons?.length > 0">
      <Button
        @click.native="updateLessonPopup = true"
        padding="1rem 0rem"
        :type="'text-primary'"
        :text="'تعديل الدرس '"
      >
        <template>
          <img src="@/assets/imgs/dashboard/vuesax-bulk-edit-2.svg" alt="" />
        </template>
      </Button>
    </div>
    <div v-if="course?.lessons?.length > 0" class="mb-4 d-flex gap-4 flex-wrap">
      <Button
        padding="1.3rem 2.5rem"
        @click.native="activeLessonTab = 0"
        :type="activeLessonTab === 0 ? 'dark' : 'dark-reverse'"
        :text="'ملفات الفيديو'"
      >
        <template>
          <img
            v-if="activeLessonTab === 0"
            src="@/assets/imgs/dashboard/video-square-broken.svg"
            alt=""
          />
          <img v-else src="@/assets/imgs/dashboard/video-square-broken-2.svg" alt="" />
        </template>
      </Button>

      <Button
        padding="1.3rem 2.5rem"
        @click.native="activeLessonTab = 1"
        :type="activeLessonTab === 1 ? 'dark' : 'dark-reverse'"
        :text="'ملفات الدرس'"
      >
        <template>
          <img
            v-if="activeLessonTab === 1"
            src="@/assets/imgs/dashboard/folder-open-bulk-2.svg"
            alt=""
          />
          <img v-else src="@/assets/imgs/dashboard/folder-open-bulk.svg" alt="" />
        </template>
      </Button>
      <Button
        padding="1.3rem 2.5rem"
        @click.native="activeLessonTab = 2"
        :type="activeLessonTab === 2 ? 'dark' : 'dark-reverse'"
        :text="'اختبار الدرس'"
      >
        <template>
          <img
            v-if="activeLessonTab === 2"
            src="@/assets/imgs/dashboard/question-white.svg"
            alt=""
          />
          <img v-else src="@/assets/imgs/dashboard/question-black.svg" alt="" />
        </template>
      </Button>
    </div>
    <!-- Videos -->
    <div v-if="course?.lessons?.length > 0 && activeLessonTab == 0">
      <VideoCards
        :course="course"
        :lessonId="course?.lessons?.[activeLesson]?.id"
        v-if="lessonVideos.length > 0"
        @reloadCourse="reloadCourse"
        :videos="lessonVideos"
      />
      <div v-else>
        <NoVideosExist
          @reloadCourse="reloadCourse"
          :course="course"
          :lessonId="course?.lessons?.[activeLesson]?.id"
        />
      </div>
    </div>
    <!-- PDFs -->
    <div v-if="course?.lessons?.length > 0 && activeLessonTab == 1">
      <PdfCards
        :course="course"
        :lessonId="course?.lessons?.[activeLesson]?.id"
        v-if="lessonPdfs.length > 0"
        @reloadCourse="reloadCourse"
        :pdfs="lessonPdfs"
      />
      <div v-else>
        <NoPdfsExist
          :course="course"
          :lessonId="course?.lessons?.[activeLesson]?.id"
          @reloadCourse="reloadCourse"
        />
      </div>
    </div>
    <!-- Lesson Exams -->
    <div v-if="course?.lessons?.length > 0 && activeLessonTab == 2">
      <ExamCards
        :course="course"
        :lessonId="course?.lessons?.[activeLesson]?.id"
        v-if="lessonExams.length > 0"
        @reloadCourse="reloadCourse"
        :exams="lessonExams"
      />
      <div v-else>
        <NoExamsExist
          @reloadCourse="reloadCourse"
          :course="course"
          :lessonId="course?.lessons?.[activeLesson]?.id"
        />
      </div>
    </div>

    <AddLessonPopup
      :course="course"
      :isOpened="addLessonPopup"
      @finished="(addLessonPopup = false), $emit('reloadCourse')"
      @close="addLessonPopup = false"
    />

    <UpdateLessonPopup
      v-if="updateLessonPopup"
      :lesson="course.lessons?.[activeLesson]"
      :course="course"
      :isOpened="updateLessonPopup"
      @finished="(updateLessonPopup = false), $emit('reloadCourse')"
      @close="updateLessonPopup = false"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import NoVideosExist from "@/components/Dashboard/Course/NoVideos.vue";
import NoExamsExist from "@/components/Dashboard/Course/NoExams.vue";
import NoPdfsExist from "@/components/Dashboard/Course/NoPdfs.vue";
import AddLessonPopup from "@/components/Dashboard/Popups/AddLesson.vue";
import UpdateLessonPopup from "@/components/Dashboard/Popups/UpdateLesson.vue";

import VideoCards from "@/components/Dashboard/Course/VideoCards.vue";
import PdfCards from "@/components/Dashboard/Course/PdfCards.vue";
import ExamCards from "@/components/Dashboard/Course/ExamCards.vue";

export default {
  components: {
    Button,
    NoVideosExist,
    NoExamsExist,
    NoPdfsExist,
    AddLessonPopup,
    UpdateLessonPopup,

    ExamCards,
    VideoCards,
    PdfCards,
  },
  props: {
    course: {
      required: true,
      type: Object,
    },
  },
  computed: {
    lessonVideos() {
      return this.course?.lessons?.[this.activeLesson]?.admin_materials?.filter(
        (ele) => ele.type === "VIDEO"
      );
    },
    lessonPdfs() {
      return this.course?.lessons?.[this.activeLesson]?.admin_materials?.filter(
        (ele) => ele.type === "PDF"
      );
    },
    lessonExams() {
      return this.course?.lessons?.[this.activeLesson]?.admin_materials?.filter(
        (ele) => ele.type === "EXAM"
      );
    },
  },
  data() {
    return {
      activeLessonTab: 0,
      activeLesson: 0,
      addLessonPopup: false,
      updateLessonPopup: false,
    };
  },
  methods: {
    async reloadCourse() {
      await this.$nextTick();
      this.$emit("reloadCourse");
    },
  },
};
</script>
