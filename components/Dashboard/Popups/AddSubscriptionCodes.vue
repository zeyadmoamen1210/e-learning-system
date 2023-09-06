<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <h6 class="font font--semibold mb-4 font-h4">إضافة أكواد جديدة</h6>
        <p class="font-h5 font--light">
          قم بتحديد بيانات أكواد الإشتراك التي تريد إنشائها
        </p>

        <div class="mt-5">
          <el-form ref="addCodesRef" class="mb-4" :model="addCodes">
            <el-form-item
              prop="course"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <label for="select-course" class="text-end d-block font-h6"
                >اختر الكورس
              </label>
              <el-select
                class="w-100"
                v-model="addCodes.course"
                placeholder="اختر الكورس"
                id="select-course"
              >
                <el-option
                  v-for="(item, index) in courses"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="count"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <label for="course-count" class="text-end d-block font-h6">
                عدد الأكواد
              </label>
              <el-input
                class="w-100"
                v-model="addCodes.count"
                placeholder="عدد الأكواد"
                id="course-count"
              ></el-input>
            </el-form-item>
          </el-form>

          <button @click="submitFilter" class="button button--primary w-100 mb-4 py-3">
            إضافة
          </button>
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
      addCodes: {},
      loading: false,
      courses: [],
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
      this.$refs.addCodesRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post(`/courses/${this.addCodes.course}/codes`, {
              count: this.addCodes.count,
            });
            this.$emit("close");
            this.$emit("reload");
            this.$awn.success("تم إضافة الاكواد بنجاح");
          } catch (err) {
            this.$awn.alert(" حدث خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
