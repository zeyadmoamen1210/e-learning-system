<template>
  <div class="selected-content">
    <VideoPlayer
      v-if="selectedContent.type == 'VIDEO'"
      :selectedContent="selectedContent"
      :course="course"
    />

    <PdfPlayer
      v-if="selectedContent.type == 'PDF'"
      :selectedContent="selectedContent"
      :course="course"
    />

    <ExamPlayer
      v-if="selectedContent.type == 'EXAM'"
      :selectedContent="selectedContent"
      :course="course"
    />
  </div>
</template>

<script>
import VideoPlayer from "./Materials/VideoPlayer";
import PdfPlayer from "./Materials/PdfPlayer";
import ExamPlayer from "./Materials/ExamPlayer";

export default {
  components: {
    VideoPlayer,
    PdfPlayer,
    ExamPlayer,
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
    };
  },
};
</script>
