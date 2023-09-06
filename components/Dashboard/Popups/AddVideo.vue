<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/video-square-broken-green.svg" alt="" />
          </div>

          <h6 class="font font--semibold mb-4 font-h4">إضافة فيديو</h6>
          <p class="font-h5 font--light">قم بإضافة بيانات الفيديو</p>

          <div class="mt-5">
            <div>
              <el-form ref="addVideoRef" class="mb-4" :model="addVideo">
                <el-form-item
                  prop="url"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="url" class="text-end d-block font-h6"> رابط الفيديو </label>
                  <el-input
                    id="url"
                    v-model="addVideo.url"
                    placeholder="رابط الفيديو"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="title" class="text-end d-block font-h6">
                    عنوان الفيديو
                  </label>

                  <el-input
                    v-model="addVideo.title"
                    placeholder="عنوان الفيديو"
                    id="title"
                  ></el-input>
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
                        <label for="duration" class="text-end d-block font-h6">
                          مدة الفيديو
                        </label>
                        <el-input
                          v-model.number="addVideo.duration"
                          placeholder="مدة الفيديو"
                          id="duration"
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
                          v-model.number="addVideo.view_limit"
                          placeholder="عدد مرات المشاهدة"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div> -->
                </div>

                <el-form-item prop="description">
                  <label for="description" class="text-end d-block font-h6">
                    وصف الفيديو
                  </label>
                  <el-input
                    type="textarea"
                    :rows="5"
                    id="description"
                    v-model="addVideo.description"
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
  },
  data() {
    return {
      loading: false,
      addVideo: {
        view_limit: 999999999,
      },
    };
  },
  methods: {
    resetVideoform() {
      this.addVideo = {
        type: "VIDEO",
        lesson_id: this.lessonId,
        view_limit: 999999999,
      };
    },
    submitAddVideo() {
      this.$refs.addVideoRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post(`/materials/video`, {
              ...this.addVideo,
              type: "VIDEO",
              lesson_id: this.lessonId,
            });
            this.resetVideoform();
            this.$emit("added", false);
            this.$emit("close", false);
            this.$awn.success("تم إضافة الفيديو بنجاح");
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
