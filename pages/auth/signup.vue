<template>
  <div class="login" v-loading="loading">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">إنشاء حساب جديد</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتسجيل بياناتك لإنشاء حساب جديد
        </h6>

        <!-- <button class="button__gmail w-100">
          <img src="@/assets/imgs/gmail.svg" alt="" />
          <span class="font--semibold"> التسجيل عن طريق جوجل</span>
        </button>

        <div class="login__or mb-5 mt-5">
          <span>أو</span>
        </div> -->

        <div>
          <el-form :model="signupForm" ref="signupFormRef" :rules="rules">
            <el-form-item prop="name">
              <el-input placeholder="الاسم " v-model="signupForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                placeholder="البريد الإلكتروني"
                v-model="signupForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                type="password"
                placeholder="كلمة المرور"
                v-model="signupForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordConfirm">
              <el-input
                placeholder="تأكيد كلمة المرور"
                v-model="signupForm.passwordConfirm"
                type="password"
              ></el-input>
            </el-form-item>

            <el-form-item prop="phone">
              <el-input placeholder="رقم الموبايل" v-model="signupForm.phone"></el-input>
            </el-form-item>

            <!-- <el-form-item prop="role_id">
              <el-select
                style="width: 100%"
                v-model="signupForm.role_id"
                placeholder="الصلاحية"
              >
                <el-option
                  v-for="role in roles"
                  :key="role.val"
                  :label="role.title"
                  :value="role.val"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>

          <button
            @click="submitSignUp()"
            class="button button--primary w-100 mb-4 mt-4 p-3"
          >
            إنشاء
          </button>
          <button
            @click="$router.push('/auth/login')"
            class="button button--primary-plain w-100 p-3"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  middleware: ["loggedIn"],
  methods: {
    async login() {
      this.loading = true;
      try {
        const res = await this.$auth.loginWith("local", {
          data: { email: this.signupForm.email, password: this.signupForm.password },
        });
        await this.$auth.setUser(res.data.user);
        if (res.data.user.role_id != 1) {
          this.$router.push("/student");
        } else {
          this.$router.push("/dashboard");
        }
      } finally {
        this.loading = false;
      }
    },
    submitSignUp() {
      this.$refs.signupFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$axios.post(`/auth/register`, {
              ...this.signupForm,
              role_id: 3,
            });
            this.login();
            this.$notify({
              title: "تم بنجاح",
              message: "تم إنشاء الحساب بنجاح",
              type: "success",
            });
          } catch (err) {
            if (err.response.status == 422) {
              this.$notify.error({
                title: " خطأ",
                message: err.response?.data?.message,
              });
              return;
            }
            this.$notify.error({
              title: " خطأ",
              message: "حدث خطأ ما",
            });
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        return callback(new Error("هذا الحقل مطلوب"));
      } else {
        const regex = /^01[0125][0-9]{8}$/;
        console.log(value);
        if (!value.match(regex)) {
          return callback(new Error("رقم الموبايل غير صالح يجب ان يكون رقم موبايل مصري"));
        }
      }
      callback();
    };

    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("هذا الحقل مطلوب"));
      } else if (value !== this.signupForm.password) {
        callback(new Error("كلمة المرور غير متطابقة!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      signupForm: {},
      roles: [
        { title: "أدمن", val: 1 },
        { title: "مُساعد", val: 2 },
        { title: "طالب", val: 3 },
      ],
      rules: {
        name: [{ required: true, message: "هذا الحقل مطلوب" }],
        email: [
          { required: true, message: "هذا الحقل مطلوب" },
          { type: "email", message: "يجب ان يكون بريد إلكتروني صالح" },
        ],
        password: [{ required: true, message: "هذا الحقل مطلوب" }],
        passwordConfirm: [
          { required: true, message: "هذا الحقل مطلوب" },
          { validator: validateConfirmPass, trigger: "blur" },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        role_id: [{ required: true, message: "هذا الحقل مطلوب" }],
      },
    };
  },
};
</script>
