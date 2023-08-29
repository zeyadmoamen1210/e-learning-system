<template>
  <div>
    <div class="d-flex gap-2 justify-content-between flex-wrap">
      <div>
        <h6 class="font-h4 font--regular">تفاصيل الأسئلة</h6>
        <p class="font--light font-h5">عرض لتفاصيل الأسئلة التي يجب تصحيحها</p>

        <div class="mt-5 d-flex gap-5 flex-wrap">
          <div>
            <span class="d-block font-h6 font--light mb-2">اسم الطالب</span>
            <h6 class="font-h5 font--regular">أحمد محمود سليم</h6>
          </div>
          <div>
            <span class="d-block font-h6 font--light mb-2">اسم الكورس</span>
            <h6 class="font-h5 font--regular">مبادئ أساسيات الفيزياء</h6>
          </div>
          <div>
            <span class="d-block font-h6 font--light mb-2">اسم الاختبار</span>
            <h6 class="font-h5 font--regular">اختبار الدرس الأول</h6>
          </div>
        </div>
      </div>
      <div>
        <Button
          @click.native="submitCorrectionPopup = true"
          padding="1.2rem 1.5rem"
          textClasses="font-h5 font--regular"
          type="primary"
          text="إنهاء التصحيح"
        >
        </Button>
      </div>
    </div>

    <div class="mt-5">
      <div class="mb-4" v-for="i in 5" :key="i">
        <QuestionToCorrect />
      </div>
    </div>

    <ExamCorrectedSuccessfully
      :isOpened="submitCorrectionPopup"
      @close="submitCorrectionPopup = false"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import QuestionToCorrect from "@/components/Dashboard/Questions/Correct.vue/";
import ExamCorrectedSuccessfully from "@/components/Dashboard/Popups/ExamCorrectedSuccessfully.vue";

export default {
  middleware: ["prevent-student"],
  layout: "dashboard",
  components: {
    Button,
    QuestionToCorrect,
    ExamCorrectedSuccessfully,
  },
  data() {
    return {
      submitCorrectionPopup: false,
    };
  },
};
</script>
