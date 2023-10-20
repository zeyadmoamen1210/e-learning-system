<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/question-dark-2.svg" alt="" />
          </div>

          <h6 class="font font--semibold mb-4 font-h4">إضافة اختبار</h6>
          <p class="font-h5 font--light">قم بإضافة بيانات الاختبار</p>

          <div class="mt-5">
            <div>
              <el-form ref="addExamRef" class="mb-4" :model="addExam">
                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="exam-title" class="text-end d-block font-h6"
                    >عنوان الإحتبار</label
                  >
                  <el-input
                    v-model="addExam.title"
                    placeholder="عنوان الاختبار"
                    id="exam-title"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="duration"
                  :rules="[
                    { required: true, message: 'هذا الحقل مطلوب' },
                    { type: 'number', message: 'هذا الحقل يجب ان يكون رقم صحيح' },
                  ]"
                >
                  <label for="exam-duration" class="text-end d-block font-h6"
                    >مدة الإختبار</label
                  >
                  <el-input
                    v-model.number="addExam.duration"
                    placeholder="حدد المدة الزمنية لحل الاختبار"
                    id="exam-duration"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="pass_from"
                  :rules="[
                    { required: true, message: 'هذا الحقل مطلوب' },
                    { type: 'number', message: 'هذا الحقل يجب ان يكون رقم صحيح' },
                  ]"
                >
                  <label for="exam-pass_from" class="text-end d-block font-h6"
                    >درجة النجاح
                  </label>
                  <el-input
                    v-model.number="addExam.pass_from"
                    placeholder="حدد درجة النجاح للاختبار "
                    id="exam-pass_from"
                  ></el-input>
                </el-form-item>

                <el-form-item prop="description">
                  <label for="exam-description" class="text-end d-block font-h6"
                    >الوصف
                  </label>
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="addExam.description"
                    placeholder="وصف الامتحان"
                    id="exam-description"
                  ></el-input>
                </el-form-item>
              </el-form>
                <div class="col-md-6 col-lg-2">
                <div>
                  <h6 class="font-h6"> متاح او لا </h6>
                  <div class="d-flex gap-2 justify-content-start mt-2">
                   <el-switch
                      v-model="addExam.active"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </div>
                </div>
              </div>

              <button
                @click="submitAddExam"
                class="button button--primary w-100 mb-4 mt-4 py-3"
              >
                إضافة
              </button>
            </div>
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
  props: {
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
    lessonId: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      addExam: {},
    };
  },
  methods: {
    resetExamform() {
      this.addExam = {
        type: "EXAM",
        lesson_id: this.lessonId,
      };
    },
    submitAddExam() {
      this.$refs.addExamRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post(`/materials/exam`, {
              ...this.addExam,
              lesson_id: this.lessonId,
              type: "EXAM",
            });
            this.resetExamform();
            this.$emit("close", false);
            this.$emit("added", false);
            this.$awn.success("تم إضافة الامتحان بنجاح");
          } catch {
            this.$awn.alert("هناك خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
