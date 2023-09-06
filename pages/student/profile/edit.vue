<template>
  <div class="login" v-loading="loading">
    <div class="container">
      <div class="login__inner">
        <h6
          class="login__title font-h4 mb-4 d-flex gap-2 align-items-center justify-content-center"
        >
          <img src="@/assets/imgs/edit.svg" alt="" />
          <span>تعديل بياناتي الشخصية</span>
        </h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتعديل بياناتك الشخصية التي أدخلتها
        </h6>

        <div>
          <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
            <el-form-item prop="name">
              <el-input placeholder="الاسم" v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                placeholder="البريد الإلكتروني"
                v-model="loginForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input placeholder="رقم الموبايل" v-model="loginForm.phone"></el-input>
            </el-form-item>
          </el-form>

          <button
            @click="submitUpdateProfile"
            class="button button--primary w-100 mb-3 mt-4 p-4"
          >
            حفظ التعديلات
          </button>
          <button
            @click="$router.push('/student/profile/change-password')"
            class="button button--primary-plain w-100 mb-4 mt-4 p-4 px-5 d-flex gap-1 justify-content-between"
          >
            <div class="d-flex gap-3 align-items-center">
              <img src="@/assets/imgs/vuesax-broken-lock.svg" alt="" />
              <span>تغيير كلمة المرور</span>
            </div>
            <div>
              <img src="@/assets/imgs/vuesax-linear-arrow-left.svg" alt="" />
            </div>
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
    var validatePhone = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        return callback(new Error("هذا الحقل مطلوب"));
      }
      const regex = /^01[0125][0-9]{8}$/;
      if (!value.match(regex)) {
        return callback(new Error("رقم الموبايل غير صالح يجب ان يكون رقم موبايل مصري"));
      }
      callback();
    };
    return {
      loginForm: {},
      loading: false,
      loginFormRules: {
        name: [{ required: true, message: "هذا الحقل مطلوب" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        email: [
          { required: true, message: "هذا الحقل مطلوب" },
          { type: "email", message: "يجب ان يكون بريد إلكتروني صالح" },
        ],
      },
    };
  },
  mounted() {
    this.getMe();
  },
  methods: {
    //
    submitUpdateProfile() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post("/profile", {
              name: this.loginForm.name,
              phone: this.loginForm.phone,
              email: this.loginForm.email,
            });
            this.$awn.success("تم تعديل البروفايل بنجاح");
          } catch (err) {
            console.log(err);
            if (err.response.status === 422) {
              this.$awn.alert(err.response?.data?.message);

              return;
            }
            this.$awn.alert("هناك خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async getMe() {
      this.loading = true;
      try {
        const res = await this.$axios.post(`/auth/me`);
        this.loginForm = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
