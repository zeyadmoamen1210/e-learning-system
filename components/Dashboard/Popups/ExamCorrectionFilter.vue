<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/candle-2-bulk-2.svg" alt="" />
          </div>

          <h6 class="font font--semibold mb-4 font-h4">فلترة</h6>
          <p class="font-h5 font--light">قم بفلترة نتائج تصحيح الاختبارات</p>

          <div class="mt-5">
            <el-form
              ref="examCorrectionFilterRef"
              class="mb-4"
              :model="examCorrectionFilter"
            >
              <el-form-item prop="course">
                <el-select
                  class="w-100"
                  clearable
                  v-model="examCorrectionFilter.course"
                  placeholder="اختر الكورس"
                >
                  <el-option
                    v-for="(examAndCourse, index) in coursesAndExams"
                    :key="index"
                    :value="examAndCourse.course_id"
                    :label="examAndCourse.course_name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="exam">
                <el-select
                  class="w-100"
                  clearable
                  v-model="examCorrectionFilter.exam"
                  placeholder="اختر الاختبار"
                >
                  <el-option
                    v-for="(examAndCourse, index) in coursesAndExams"
                    :key="index"
                    :value="examAndCourse.exam_id"
                    :label="examAndCourse.exam_name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <button @click="submitFilter" class="button button--primary w-100 mb-4 py-3">
              عرض النتائج
            </button>
          </div>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/Layouts/Popup.vue";
export default {
  components: {
    Popup,
  },
  mounted() {
    this.getCoursesAndExams();
  },
  props: {
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
    data: {
      required: true,
    },
  },
  created() {
    console.log(this.examCorrectionFilter);
  },
  data() {
    return {
      codeForm: {},
      examCorrectionFilter: {
        course: this.data?.course_id,
        exam: this.data?.exam_id,
      },
      coursesAndExams: [],
      loading: false,
    };
  },
  methods: {
    async getCoursesAndExams() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/exam-solutions-filters`);
        this.coursesAndExams = res.data;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
    submitFilter() {
      this.$emit("filter", {
        course_id: this.examCorrectionFilter.course,
        exam_id: this.examCorrectionFilter.exam,
      });
    },
  },
};
</script>
