<template>
  <div class="login">
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
          <el-form :model="loginForm">
            <el-form-item
              prop="currentPassword"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                type="password"
                placeholder="كلمة المرور الحالية"
                v-model="loginForm.currentPassword"
              ></el-input>
            </el-form-item>
            <div class="d-flex flex-row-reverse">
              <span class="font-h5 mb-4"> هل نسيت كلمة المرور ؟ </span>
            </div>
            <el-form-item
              prop="newPassword"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                type="password"
                placeholder="كلمة المرور الجديدة"
                v-model="loginForm.newPassword"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="confirmNewPassword"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                type="password"
                placeholder="تأكيد كلمة المرور الجديدة"
                v-model="loginForm.confirmNewPassword"
              ></el-input>
            </el-form-item>
          </el-form>

          <button class="button button--primary w-100 mb-3 mt-4 p-4">
            حفظ كلمة المرور
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
