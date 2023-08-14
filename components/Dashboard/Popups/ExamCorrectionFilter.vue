<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header></template>
      <template #body>
        <div class="mb-4 mt-2">
          <img src="@/assets/imgs/dashboard/candle-2-bulk-2.svg" alt="" />
        </div>

        <h6 class="font font--semibold mb-4 font-h4">فلترة</h6>
        <p class="font-h5 font--light">قم بفلترة نتائج تصحيح الاختبارات</p>

        <div class="mt-5">
          <el-form
            ref="examCorrectionFilterRef"
            class="mb-4"
            :model="examCorrectionFilter"
          >
            <el-form-item
              prop="course"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-select
                class="w-100"
                v-model="examCorrectionFilter.course"
                placeholder="اختر الكورس"
              ></el-select>
            </el-form-item>
            <el-form-item
              prop="exam"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-select
                class="w-100"
                v-model="examCorrectionFilter.exam"
                placeholder="اختر الاختبار"
              ></el-select>
            </el-form-item>
          </el-form>

          <button @click="submitFilter" class="button button--primary w-100 mb-4 py-3">
            عرض النتائج
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
      codeForm: {},
      examCorrectionFilter: {},
    };
  },
  methods: {
    submitFilter() {
      this.$refs.examCorrectionFilterRef.validate((valid) => {
        if (valid) {
        }
      });
    },
  },
};
</script>
