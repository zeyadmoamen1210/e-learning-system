<template>
  <div class="login">
    <div class="container">
      <div class="login__inner">
        <h6 class="login__title font-h4 mb-4">تسجيل الدخول</h6>
        <h6 class="login__description font--light font-h5 mb-5">
          قم بتسجيل الدخول إلى حسابك
        </h6>

        <!-- <button class="button__gmail w-100">
          <img src="@/assets/imgs/gmail.svg" alt="" />
          <span class="font--semibold">الدخول عن طريق جوجل</span>
        </button>

        <div class="login__or mb-5 mt-5">
          <span>أو</span>
        </div> -->

        <div class="d-flex gap-2 mb-4">
          <Button
            class="flex-grow-1"
            padding="1rem"
            :type="loginType === 1 ? 'primary' : 'primary-plain'"
            @click.native="loginType = 1"
            :center="true"
            text="التسجيل بالبريد الإلكتروني"
            text-classes="font-h5 font--regular"
          ></Button>
          <Button
            class="flex-grow-1"
            padding="1rem"
            :type="loginType === 2 ? 'primary' : 'primary-plain'"
            @click.native="loginType = 2"
            :center="true"
            text="التسجيل برقم الموبايل"
            text-classes="font-h5 font--regular"
          ></Button>
        </div>

        <div>
          <el-form :model="loginForm" ref="loginFormRef">
            <el-form-item
              v-if="loginType == 1"
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
              v-if="loginType == 2"
              prop="phone"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input placeholder="رقم الموبايل" v-model="loginForm.phone"></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="{ required: true, message: 'هذا الحقل مطلوب' }"
            >
              <el-input
                type="password"
                placeholder="كلمة المرور"
                v-model="loginForm.password"
              ></el-input>
            </el-form-item>
          </el-form>

          <!-- <div class="d-flex flex-row-reverse mb-3">
            <nuxt-link class="login__forget-pass" to="/auth/forget-password"
              >هل نسيت كلمة المرور ؟</nuxt-link
            >
          </div> -->

          <button
            v-loading.fullscreen.lock="fullScreenLoading"
            @click="submitLogin"
            class="button button--primary w-100 mb-4 mt-4 p-3"
          >
            الدخول
          </button>
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
import Button from "@/components/Layouts/Button.vue";
export default {
  auth: false,
  middleware: ["loggedIn"],
  components: {
    Button,
  },
  data() {
    return {
      loginForm: {},
      fullScreenLoading: false,
      loginType: 1,
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.fullScreenLoading = true;
          try {
            const loginForm = {
              password: this.loginForm.password,
            };
            if (this.loginType === 1) {
              loginForm.email = this.loginForm.email;
            } else {
              loginForm.phone = this.loginForm.phone;
            }
            const res = await this.$auth.loginWith("local", { data: loginForm });
            await this.$auth.setUser(res.data.user);
            console.log(res.data.user);
            if (res.data.user.role_id != 1) {
              this.$router.push("/student");
            } else {
              this.$router.push("/dashboard");
            }
          } catch (err) {
            console.log(err);
            this.$notify.error({
              title: "خطأ",
              message: " البريد الإلكتروني او كلمة المرور غير صحيح",
            });
          } finally {
            this.fullScreenLoading = false;
          }
        }
      });
    },
  },
};
</script>
