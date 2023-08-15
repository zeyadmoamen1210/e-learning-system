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
              <el-select
                class="w-100"
                v-model="addCodes.course"
                placeholder="اختر الكورس"
              ></el-select>
            </el-form-item>
            <el-form-item
              prop="exam"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-select
                class="w-100"
                v-model="addCodes.exam"
                placeholder="عدد الأكواد"
              ></el-select>
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
    };
  },
  methods: {
    submitFilter() {
      this.$refs.addCodesRef.validate((valid) => {
        if (valid) {
        }
      });
    },
  },
};
</script>
