<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">هل نسيت كلمة المرور ؟</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          يمكنك إعادة تعيين كلمة المرور الخاصة بكل سهولة
        </h6>

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
          </el-form>

          <button class="button button--primary w-100 mb-4 mt-4 p-3">تأكيد</button>
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
