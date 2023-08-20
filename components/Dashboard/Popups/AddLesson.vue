<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--semibold mb-4 font-h4">إضافة درس</h6>
          <p class="font-h5 font--light">قم بإضافة بيانات الدرس</p>

          <div class="mt-5">
            <div>
              <el-form ref="addLessonRef" class="mb-4" :model="addLesson">
                <el-form-item
                  prop="name"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input v-model="addLesson.name" placeholder="عنوان الدرس"></el-input>
                </el-form-item>
              </el-form>

              <button
                @click="submitAddLesson"
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
    course: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      addLesson: {},
    };
  },
  methods: {
    resetLessonform() {
      this.addLesson = {
        course_id: this.course.id,
      };
    },
    submitAddLesson() {
      this.$refs.addLessonRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.addLesson);
          try {
            const res = await this.$axios.post(`/lessons`, {
              ...this.addLesson,
              course_id: this.course.id,
            });
            this.resetLessonform();
            this.$emit("finished", false);
            this.$notify({
              title: "تم بنجاح",
              message: "تم إضافة الدرس بنجاح",
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
