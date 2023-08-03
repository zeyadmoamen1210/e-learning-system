<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <div class="mb-3">
          <img src="@/assets/imgs/vuesax-bulk-sms-notification.png" alt="" />
        </div>
        <h6 class="login__title font-h4 mb-4">تفعيل الحساب</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بالذهاب إلى البريد الإلكتروني الخاص بك الذي أدخلته لتفعيل حسابك
        </h6>

        <div>
          <button class="button button--primary-plain w-100 p-3">حسنا</button>
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
