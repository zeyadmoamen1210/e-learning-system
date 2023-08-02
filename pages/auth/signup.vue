<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">إنشاء حساب جديد</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتسجيل بياناتك لإنشاء حساب جديد
        </h6>

        <button class="button__gmail w-100">
          <img src="@/assets/imgs/gmail.svg" alt="" />
          <span class="font--semibold"> التسجيل عن طريق جوجل</span>
        </button>

        <div class="login__or mb-5 mt-5">
          <span>أو</span>
        </div>

        <div>
          <el-form :model="loginForm">
            <el-form-item
              prop="name"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input placeholder="الاسم " v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item
              prop="email"
              :rules="[
                { required: true, message: 'هذا الحقل مطلوب' },
                { type: 'email', message: 'يجب ان يكون بريد إلكتروني صالح' },
              ]"
            >
              <el-input
                placeholder="البريد الإلكتروني"
                v-model="loginForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input placeholder="كلمة المرور" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item
              prop="passwordConfirm"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                placeholder="تأكيد كلمة المرور"
                v-model="loginForm.passwordConfirm"
              ></el-input>
            </el-form-item>
          </el-form>

          <button class="button button--primary w-100 mb-4 mt-4 p-3">إنشاء</button>
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
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
