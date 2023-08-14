<template>
  <div>
    <div class="text-center mt-5" v-if="examCorrection.length === 0">
      <div>
        <img src="@/assets/imgs/dashboard/vuesax-linear-task.png" alt="" />
      </div>
      <h6 class="text-center font-h4 mt-3">الاختبارات</h6>
      <p class="font--light mb-4 mt-3">لا يوجد لديك أي اختبارات لتصحيحها</p>
    </div>
    <div v-else>
      <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
        <div>
          <h6 class="font-h4 font--regular">تصحيح الاختبارات</h6>
          <p class="font--light font-h5">
            عرض لجميع أسئلة الاختبارات التي تحتاج إلى التصحيح
          </p>
        </div>
        <div>
          <Button
            @click.native="examCorrectionFilterPopup = true"
            padding="1.2rem 1.5rem"
            textClasses="font-h5 font--regular"
            type="primary"
            text="فلترة"
          >
            <template>
              <img src="@/assets/imgs/dashboard/candle-2-bulk.svg" alt="" />
            </template>
          </Button>
        </div>
      </div>


      <div class="app-table-container">
      <table class="app-table">
        <thead>
          <th>
            <td> اسم الطالب </td>
          </th>
          <th>
            <td> اسم الكورس</td>
          </th>
          <th>
            <td> اسم الاختبار </td>
          </th>
          <th>
            <td> خيارات </td>
          </th>
        </thead>
        <tbody>
          <tr v-for="x in 15" :key="x">
            <td>أحمد محمود سليم</td>
            <td>مبادئ أساسيات الفيزياء</td>
            <td>
              اختبار الدرس الأول
            </td>
            <td>
              <div class="d-flex gap-5">
                <Button
                  @click.native="$router.push(`/dashboard/exam-correction/1`)"
                  padding="0"
                  type="text-primary"
                  text="تفاصيل الأسئلة">
                  <img src="@/assets/imgs/dashboard/eye-linear.svg" alt="">
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

    <ExamCorrectionFilter :isOpened="examCorrectionFilterPopup" @close="examCorrectionFilterPopup = false" />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import ExamCorrectionFilter from "@/components/Dashboard/Popups/ExamCorrectionFilter.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    ExamCorrectionFilter
  },
  data() {
    return {
      examCorrection: [""],
      examCorrectionFilterPopup: false,
    };
  },
};
</script>
