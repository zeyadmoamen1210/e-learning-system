<template>
  <div class="text-center mt-5">
    <div>
      <img src="@/assets/imgs/dashboard/video-square-broken-33.svg" alt="" />
    </div>
    <h6 class="text-center font-h4 mt-3">لا يوجد فيديوهات</h6>
    <p class="font--light mb-4 mt-3">لم تقم بإضافة أي فيديوهات للكورس</p>
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
