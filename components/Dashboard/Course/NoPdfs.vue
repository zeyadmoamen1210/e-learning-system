<template>
  <div class="text-center mt-5">
    <div>
      <img src="@/assets/imgs/dashboard/question-lg.svg" alt="" />
    </div>
    <h6 class="text-center font-h4 mt-3">لا يوجد ملفات</h6>
    <p class="font--light mb-4 mt-3">لم تقم بإضافة أي ملفات للكورس</p>
    <Button
      @click.native="addPdfPopup = true"
      type="success-plain"
      text="إضافة ملف"
      padding="1rem 2.5rem"
    >
      <template>
        <img src="@/assets/imgs/dashboard/video-square-broken-3.svg" alt="" />
      </template>
    </Button>

    <AddPdfPopup
      :isOpened="addPdfPopup"
      :lessonId="lessonId"
      :course="course"
      @close="addPdfPopup = false"
      @added="$emit('reloadCourse')"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AddPdfPopup from "@/components/Dashboard/Popups/AddPdf.vue";

export default {
  components: {
    Button,
    AddPdfPopup,
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
      addPdfPopup: false,
    };
  },
};
</script>
