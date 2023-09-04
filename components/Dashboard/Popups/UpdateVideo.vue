<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/video-square-broken-green.svg" alt="" />
          </div>

          <h6 class="font font--semibold mb-4 font-h4">تعديل الفيديو</h6>
          <p class="font-h5 font--light">قم بتعديل بيانات الفيديو</p>

          <div class="mt-5">
            <div>
              <el-form ref="currVideoRef" class="mb-4" :model="video">
                <el-form-item
                  prop="url"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input v-model="video.url" placeholder="رابط الفيديو"></el-input>
                </el-form-item>

                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input v-model="video.title" placeholder="عنوان الفيديو"></el-input>
                </el-form-item>

                <div class="row">
                  <div class="col-md-12">
                    <div>
                      <el-form-item
                        prop="duration"
                        :rules="[
                          { required: true, message: 'هذا الحقل مطلوب' },
                          { type: 'number', message: 'يجب ان يكون رقم صحيح' },
                        ]"
                      >
                        <el-input
                          v-model.number="video.duration"
                          placeholder="مدة الفيديو"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>

                  <!-- <div class="col-md-6">
                    <div>
                      <el-form-item
                        prop="view_limit"
                        :rules="[
                          { required: true, message: 'هذا الحقل مطلوب' },
                          { type: 'number', message: 'يجب ان يكون رقم صحيح' },
                        ]"
                      >
                        <el-input
                          v-model.number="video.view_limit"
                          placeholder="عدد مرات المشاهدة"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div> -->
                </div>

                <el-form-item
                  prop="description"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="video.description"
                    placeholder="وصف الفيديو"
                  ></el-input>
                </el-form-item>
              </el-form>

              <button
                @click="submitAddVideo"
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
    course: {
      required: true,
    },
    currVideo: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      video: this.currVideo,
    };
  },
  methods: {
    submitAddVideo() {
      this.$refs.currVideoRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.put(`/materials/video/${this.video.id}`, {
              ...this.video,
              type: "VIDEO",
              lesson_id: this.lessonId,
            });
            this.$emit("added", false);
            this.$emit("close", false);
            this.$notify({
              title: "تم بنجاح",
              message: "تم تعديل الفيديو بنجاح",
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
