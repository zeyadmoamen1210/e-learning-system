<template>
  <div class="login">
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
          <el-form :model="loginForm">
            <el-form-item
              prop="name"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input placeholder="الاسم" v-model="loginForm.name"></el-input>
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
          </el-form>

          <button class="button button--primary w-100 mb-3 mt-4 p-4">
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
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
