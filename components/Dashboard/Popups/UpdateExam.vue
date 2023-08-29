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
              <el-form ref="updateExamRef" class="mb-4" :model="updateExam">
                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    v-model="updateExam.title"
                    placeholder="عنوان الاختبار"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="duration"
                  :rules="[
                    { required: true, message: 'هذا الحقل مطلوب' },
                    { type: 'number', message: 'هذا الحقل يجب ان يكون رقم صحيح' },
                  ]"
                >
                  <el-input
                    v-model.number="updateExam.duration"
                    placeholder="حدد المدة الزمنية لحل الاختبار"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="pass_from"
                  :rules="[
                    { required: true, message: 'هذا الحقل مطلوب' },
                    { type: 'number', message: 'هذا الحقل يجب ان يكون رقم صحيح' },
                  ]"
                >
                  <el-input
                    v-model.number="updateExam.pass_from"
                    placeholder="حدد درجة النجاح للاختبار "
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="description"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="updateExam.description"
                    placeholder="وصف الامتحان"
                  ></el-input>
                </el-form-item>
              </el-form>

              <button
                @click="submitUpdateExam"
                class="button button--primary w-100 mb-4 py-3"
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
    exam: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      updateExam: {},
    };
  },
  mounted() {
    this.updateExam = { ...this.exam, ...this.exam.content };
  },
  methods: {
    submitUpdateExam() {
      this.$refs.updateExamRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.put(`/materials/exam/${this.updateExam.id}`, {
              ...this.updateExam,
              lesson_id: this.lessonId,
              type: "EXAM",
            });
            this.$emit("close", false);
            this.$emit("added", false);
            this.$notify({
              title: "تم بنجاح",
              message: "تم تعديل الامتحان بنجاح",
              type: "success",
            });
          } catch {
            this.$notify.error({
              title: " خطأ",
              message: " هناك خطأ ما",
            });
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
