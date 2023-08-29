<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">تعيين كلمة المرور الجديدة</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتعيين كلمة المرور الجديدة الخاصة بحسابك
        </h6>

        <div>
          <el-form :model="loginForm">
            <el-form-item
              prop="password"
              :rules="{ required: true, message: 'هذا الحقل مطلوب' }"
            >
              <el-input
                placeholder=" كلمة المرور الجديدة"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="passwordConfirm"
              :rules="{ required: true, message: 'هذا الحقل مطلوب' }"
            >
              <el-input
                placeholder="تأكيد كلمة المرور الجديدة"
                v-model="loginForm.passwordConfirm"
              ></el-input>
            </el-form-item>
          </el-form>

          <button class="button button--primary w-100 mb-4 mt-4 p-3">
            حفظ كلمة المرور الجديدة
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
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
