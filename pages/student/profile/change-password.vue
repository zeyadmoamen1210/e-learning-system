<template>
  <div class="login" v-loading="loading">
    <div class="container">
      <div class="login__inner">
        <h6
          class="login__title font-h4 mb-4 d-flex gap-2 align-items-center justify-content-center"
        >
          <img src="@/assets/imgs/edit.svg" alt="" />
          <span> تغيير كلمة المرور </span>
        </h6>
        <h6 class="login__description font--light font-h5 mb-5">
          يمكنك تغيير كلمة المرور الخاصة بحسابك
        </h6>

        <div>
          <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
            <el-form-item prop="currentPassword">
              <el-input
                type="password"
                placeholder="كلمة المرور الحالية"
                v-model="loginForm.currentPassword"
              ></el-input>
            </el-form-item>
            <!-- <div class="d-flex flex-row-reverse">
              <nuxt-link
                role="button"
                tag="span"
                class="font-h5 mb-4"
                to="/auth/forget-password"
              >
                هل نسيت كلمة المرور ؟
              </nuxt-link>
            </div> -->
            <el-form-item prop="newPassword">
              <el-input
                type="password"
                placeholder="كلمة المرور الجديدة"
                v-model="loginForm.newPassword"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmNewPassword">
              <el-input
                type="password"
                placeholder="تأكيد كلمة المرور الجديدة"
                v-model="loginForm.confirmNewPassword"
              ></el-input>
            </el-form-item>
          </el-form>

          <button
            @click="submitChangePassword"
            class="button button--primary w-100 mb-3 mt-4 p-4"
          >
            حفظ كلمة المرور
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["not-admin"],
  data() {
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("هذا الحقل مطلوب"));
      } else if (value !== this.loginForm.newPassword) {
        callback(new Error("كلمة المرور غير متطابقة!"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {},
      loading: false,
      loginFormRules: {
        currentPassword: [{ required: true, message: "هذا الحقل مطلوب" }],
        newPassword: [{ required: true, message: "هذا الحقل مطلوب" }],
        confirmNewPassword: [
          { required: true, message: "هذا الحقل مطلوب" },
          { validator: validateConfirmPass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitChangePassword() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post("/change-password", {
              password: this.loginForm.currentPassword,
              new_password: this.loginForm.newPassword,
              new_password_confirmation: this.loginForm.confirmNewPassword,
            });
            this.loginForm = {};
            this.$notify({
              title: "تم بنجاح",
              message: "تم تغيير كلمة المرور",
              type: "success",
            });
          } catch (err) {
            console.log(err);
            if (err.response.status === 403) {
              this.$notify.error({
                title: "خطأ",
                message: "كلمة المرور القديمة غير صحيحة",
              });
              return;
            }
            this.$notify.error({
              title: "خطأ",
              message: "هناك خطأ ما",
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
