<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/candle-2-bulk-2.svg" alt="" />
          </div>

          <h6 class="font font--semibold mb-4 font-h4">فلترة</h6>
          <p class="font-h5 font--light">قم بفلترة نتائج أكواد الإشتراك</p>

          <div class="mt-5">
            <el-form ref="codesFilterRef" class="mb-4" :model="codesFilter">
              <el-form-item prop="course_id">
                <label for="course_id" class="text-end d-block font-h6">
                  اختر الكورس
                </label>

                <el-select
                  class="w-100"
                  v-model="codesFilter.course_id"
                  placeholder="اختر الكورس"
                  id="course_id"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in courses"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item
                prop="exam"
                :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
              >
                <el-select
                  class="w-100"
                  v-model="codesFilter.exam"
                  placeholder="تاريخ الإنشاء"
                ></el-select>
              </el-form-item> -->
            </el-form>

            <button @click="submitFilter" class="button button--primary w-100 mb-4 py-3">
              عرض النتائج
            </button>
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
  },

  data() {
    return {
      codesFilter: {},
      courses: [],
      loading: false,
    };
  },
  mounted() {
    this.getAllCourses();
  },
  methods: {
    async getAllCourses() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/courses-all`);
        this.courses = res.data;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
    submitFilter() {
      this.$refs.codesFilterRef.validate((valid) => {
        if (valid) {
          this.$emit("filter", this.codesFilter);
          this.$emit("close");
        }
      });
    },
  },
};
</script>
