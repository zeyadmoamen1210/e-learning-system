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
                  <label for="pdf-name" class="text-end d-block font-h6"
                    >عنوان الملف
                  </label>
                  <el-input
                    id="pdf-name"
                    v-model="addPdf.title"
                    placeholder="عنوان الملف"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="description">
                  <label for="pdf-description" class="text-end d-block font-h6"
                    >وصف الملف
                  </label>
                  <el-input
                    v-model="addPdf.description"
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
                />
              </div>

              <span class="font-h6 mb-3 font--danger d-block" v-if="pdfError">
                {{ pdfError }}
              </span>

               <div class="col-md-6 col-lg-2">
                <div>
                  <h6 class="font-h6"> متاح او لا </h6>
                  <div class="d-flex gap-2 justify-content-start mt-2">
                   <el-switch
                      v-model="addPdf.active"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </div>
                </div>
              </div>

              <button
                @click="submitAddPdf"
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
            this.$awn.alert("يجب إرفاق ملف ال PDF");
            return;
          }
          if (this.pdfError) {
            return;
          }
          this.loading = true;
          try {
            const formData = new FormData();
            formData.append("title", this.addPdf.title);
            if (this.addPdf.description) {
              formData.append("description", this.addPdf.description);
            }
            formData.append("type", "PDF");
            formData.append("file", this.addPdf.file);
            if(this.addPdf.active){
             formData.append("active", this.addPdf.active);
            }
            formData.append("lesson_id", this.lessonId);
            const res = await this.$axios.post(`/materials/pdf`, formData);
            this.resetExamform();
            this.$emit("close", false);
            this.$emit("added", false);
            this.$awn.success("تم إضافة الملف بنجاح");
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
