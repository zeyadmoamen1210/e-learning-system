<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">تسجيل الدخول</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتسجيل الدخول إلى حسابك
        </h6>

        <button class="button__gmail w-100">
          <img src="@/assets/imgs/gmail.svg" alt="" />
          <span class="font--semibold">الدخول عن طريق جوجل</span>
        </button>

        <div class="login__or mb-5 mt-5">
          <span>أو</span>
        </div>

        <div>
          <el-form :model="loginForm">
            <el-form-item
              prop="email"
              :rules="
                ({ required: true, message: 'هذا الحقل مطلوب' },
                { type: 'email', message: 'يجب ان يكون بريد إلكتروني صالح' })
              "
            >
              <el-input
                placeholder="البريد الإلكتروني"
                v-model="loginForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="{ required: true, message: 'هذا الحقل مطلوب' }"
            >
              <el-input placeholder="كلمة المرور" v-model="loginForm.password"></el-input>
            </el-form-item>
          </el-form>

          <div class="d-flex flex-row-reverse mb-3">
            <nuxt-link class="login__forget-pass" to="/auth/forget-password"
              >هل نسيت كلمة المرور ؟</nuxt-link
            >
          </div>

          <button class="button button--primary w-100 mb-4 mt-4 p-3">الدخول</button>
          <button
            @click="$router.push('/auth/signup')"
            class="button button--primary-plain w-100 p-3"
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
