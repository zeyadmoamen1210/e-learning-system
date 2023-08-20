<template>
  <div class="text-center mt-5">
    <div>
      <img src="@/assets/imgs/dashboard/question-lg.svg" alt="" />
    </div>
    <h6 class="text-center font-h4 mt-3">لا يوجد اختبارات</h6>
    <p class="font--light mb-4 mt-3">قم بإضافة اختبار</p>
    <Button
      @click.native="addExamPopup = true"
      type="btn-orange"
      text="إضافة اختبار جديد"
      padding="1rem 2.5rem"
    >
      <template>
        <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
      </template>
    </Button>

    <AddExamPopup
      :isOpened="addExamPopup"
      :lessonIndex="lessonIndex"
      :course="course"
      @close="addExamPopup = false"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AddExamPopup from "@/components/Dashboard/Popups/AddExam.vue";

export default {
  components: {
    Button,
    AddExamPopup,
  },
  props: {
    lessonIndex: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      addExamPopup: false,
    };
  },
};
</script>
