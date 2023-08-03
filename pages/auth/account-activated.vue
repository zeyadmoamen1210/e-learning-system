<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <div class="mb-3">
          <img src="@/assets/imgs/vuesax-bulk-profile-tick.png" alt="" />
        </div>
        <h6 class="login__title font-h4 mb-4">تم تفعيل الحساب</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          تم تفعيل حسابك بنجاح يمكنك البدأ الآن وتصفح جميع الكورسات الخاصة بالموقع
        </h6>

        <div>
          <button class="button button--primary w-100 p-3">ابدأ الآن</button>
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
