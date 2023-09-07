<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> الإشتراك بالكورس </template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--light mb-4 font-h5">
            قم بكتابة كود الإشتراك الخاص بك لتفعيل الإشتراك والبدأ بالكورس
          </h6>

          <div>
            <el-form ref="addCodeRef" class="mb-4" :model="codeForm">
              <el-form-item
                prop="code"
                :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
              >
                <el-input v-model="codeForm.code" placeholder="أدخل الكود"></el-input>
              </el-form-item>
            </el-form>

            <button @click="submitCode" class="button button--primary w-100 mb-4">
              تأكيد الإشتراك
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
    course_id: {
      required: true,
    },
  },
  data() {
    return {
      codeForm: {},
      loading: false,
    };
  },
  methods: {
    submitCode() {
      this.$refs.addCodeRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post(
              `/courses/${this.course_id}/subscribe`,
              this.codeForm
            );
            this.$awn.success("تم الأشتراك في الكورس بنجاح");

            this.$emit("close", false);
            this.$emit("reload");
          } catch (err) {
            if (err.response?.data?.message) {
              this.$awn.alert(err.response?.data?.message);
              return;
            }
            this.$awn.alert("حدث خطأ ما!");
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
