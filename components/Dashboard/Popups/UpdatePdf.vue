<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--semibold mb-4 font-h4">تعديل ملف PDF</h6>

          <div class="mt-5">
            <div>
              <el-form :model="pdf" ref="pdfRef">
                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="pdf-name" class="text-end d-block font-h6"
                    >عنوان الملف
                  </label>
                  <el-input
                    id="pdf-name"
                    v-model="pdf.title"
                    placeholder="عنوان الملف"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="description">
                  <label for="pdf-description" class="text-end d-block font-h6"
                    >وصف الملف
                  </label>
                  <el-input
                    v-model="pdf.description"
                    placeholder="وصف الملف"
                    id="pdf-description"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div>
                <AttachPhoto
                  @error="(e) => (pdfError = e)"
                  title=" ملفات الدرس"
                  type="pdf"
                  @getPhoto="setCourseFile"
                  :image="pdf.url"
                />
              </div>

              <span class="font-h6 mb-3 font--danger d-block" v-if="pdfError">
                {{ pdfError }}
              </span>

              <button
                @click="submitAddPdf"
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
    currPdf: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      pdfError: null,
      pdf: this.currPdf,
    };
  },
  methods: {
    setCourseFile(e) {
      this.pdf.file = e;
      this.pdfError = null;
    },
    resetExamform() {
      this.pdf = {};
    },
    submitAddPdf() {
      this.$refs.pdfRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const formData = new FormData();
            formData.append("title", this.pdf.title);
            if (this.pdf.description) {
              formData.append("description", this.pdf.description);
            }
            formData.append("type", "PDF");
            if (this.pdf.file) {
              formData.append("file", this.pdf.file);
            }
            formData.append("lesson_id", this.lessonId);
            formData.append("_method", "put");
            const res = await this.$axios.post(`/materials/pdf/${this.pdf.id}`, formData);
            this.$emit("close", false);
            this.$emit("added", false);
            this.$awn.success("تم تعديل الملف بنجاح");
          } catch {
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
