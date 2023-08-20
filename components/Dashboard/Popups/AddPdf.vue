<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--semibold mb-4 font-h4">إضافة ملف PDF</h6>

          <div class="mt-5">
            <div>
              <el-form :model="addPdf" ref="addPdfRef">
                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input v-model="addPdf.title" placeholder="عنوان الملف"></el-input>
                </el-form-item>
                <el-form-item
                  prop="description"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    v-model="addPdf.description"
                    placeholder="وصف الملف"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div>
                <AttachPhoto
                  @error="(e) => (pdfError = e)"
                  title=" ملفات الدرس"
                  type="pdf"
                  @getPhoto="setCourseFile"
                />
              </div>

              <span class="font-h6 mb-3 font--danger d-block" v-if="pdfError">
                {{ pdfError }}
              </span>

              <button
                @click="submitAddPdf"
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
import AttachPhoto from "@/components/Layouts/AttachPhoto.vue";
export default {
  components: {
    Popup,
    AttachPhoto,
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
      pdfError: null,
      addPdf: {},
    };
  },
  methods: {
    setCourseFile(e) {
      this.addPdf.file = e;
      this.pdfError = null;
    },
    resetExamform() {
      this.addPdf = {};
    },
    submitAddPdf() {
      this.$refs.addPdfRef.validate(async (valid) => {
        if (valid) {
          if (!this.addPdf.file) {
            this.$notify.error({
              title: " خطأ",
              message: "يجب إرفاق ملف ال PDF",
            });
            return;
          }
          if (this.pdfError) {
            return;
          }
          this.loading = true;
          try {
            const formData = new FormData();
            formData.append("title", this.addPdf.title);
            formData.append("description", this.addPdf.description);
            formData.append("type", "PDF");
            formData.append("file", this.addPdf.file);
            formData.append("lesson_id", this.lessonId);
            const res = await this.$axios.post(`/materials/pdf`, formData);
            this.resetExamform();
            this.$emit("close", false);
            this.$emit("added", false);
            this.$notify({
              title: "تم بنجاح",
              message: "تم إضافة الامتحان بنجاح",
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
