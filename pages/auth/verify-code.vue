<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">كود التحقق</h6>
        <h6 class="login__description font--light font-h5 mb-3">
          قم بكتابة كود التحقق الذي تم إراساله إليك عبر البريد الإلكتروني
        </h6>
        <h6 class="login__description font--light font-h5 mb-5">
          Khaledmohsen10@gmail.com
        </h6>

        <div dir="ltr">
          <v-otp-input
            ref="otpInput"
            style="direction: ltr; justify-content: center"
            input-classes="otp-input"
            separator=" "
            :num-inputs="5"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />

          <button class="button button--primary w-100 mb-5 mt-4 p-3">تحقق</button>
        </div>

        <h6 class="login__description font--light font-h5 mb-2">
          لم يتم إرسال كود إليك ؟
        </h6>

        <button class="btn d-flex gap-2 align-items-center m-auto">
          <img src="@/assets/imgs/rotate-left-linear.svg" alt="" />
          <span class="font-h6 font--orange">إعادة إرسال كود التحقق</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
  },
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
<style lang="scss">
.otp-input {
  width: 68px;
  height: 64px;
  padding: 5px;
  margin: 0 4px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid #cfcfcf;
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
