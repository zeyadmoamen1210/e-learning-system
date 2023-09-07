<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--semibold mb-4 font-h4">تعديل الدرس</h6>
          <p class="font-h5 font--light">قم بتعديل بيانات الدرس</p>

          <div class="mt-3">
            <div>
              <el-form ref="updateLessonRef" class="mb-4" :model="updateLesson">
                <el-form-item
                  prop="name"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="lesson-name" class="text-end d-block font-h6"
                    >عنوان الدرس
                  </label>
                  <el-input
                    id="lesson-name"
                    v-model="updateLesson.name"
                    placeholder="عنوان الدرس"
                  ></el-input>
                </el-form-item>
              </el-form>

              <button
                @click="submitUpdateLesson"
                class="button button--primary w-100 mb-4 py-3"
              >
                تعديل
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
    lesson: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      updateLesson: { ...this.lesson },
    };
  },
  methods: {
    resetLessonform() {
      this.updateLesson = {
        course_id: this.course.id,
      };
    },
    submitUpdateLesson() {
      this.$refs.updateLessonRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.updateLesson);
          try {
            const res = await this.$axios.put(`/lessons/${this.lesson.id}`, {
              name: this.updateLesson.name,
              course_id: this.course.id,
            });
            this.resetLessonform();
            this.$emit("finished", false);
            this.$awn.success("تم تعديل الدرس بنجاح");
          } catch (err) {
            console.log(err);
            this.$awn.alert(" هناك خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
