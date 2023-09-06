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
                  <label for="url" class="text-end d-block font-h6"> رابط الفديو </label>
                  <el-input
                    id="url"
                    v-model="video.url"
                    placeholder="رابط الفيديو"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <label for="title" class="text-end d-block font-h6">
                    عنوان الفديو
                  </label>

                  <el-input
                    v-model="video.title"
                    id="title"
                    placeholder="عنوان الفيديو"
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
                          مدة الفديو
                        </label>

                        <el-input
                          v-model.number="video.duration"
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
                          v-model.number="video.view_limit"
                          placeholder="عدد مرات المشاهدة"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div> -->
                </div>

                <el-form-item prop="description">
                  <label for="description" class="text-end d-block font-h6">
                    وصف الفديو
                  </label>
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="video.description"
                    placeholder="وصف الفيديو"
                    id="description"
                  ></el-input>
                </el-form-item>
              </el-form>

              <button
                @click="submitAddVideo"
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
            delete this.video.content;
            const res = await this.$axios.put(`/materials/video/${this.video.id}`, {
              ...this.video,
              description: this.video.description || null,
              type: "VIDEO",
              lesson_id: this.lessonId,
              view_limit: 999999999,
            });
            this.$emit("added", false);
            this.$emit("close", false);
            this.$awn.success("تم تعديل الفيديو بنجاح");
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
