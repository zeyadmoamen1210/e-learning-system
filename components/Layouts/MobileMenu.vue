<template>
  <div class="mobile-menu">
    <div class="d-flex gap-2 justify-content-between mobile-menu__header">
      <div>
        <img src="@/assets/imgs/landing-page/logo.svg" alt="" />
      </div>
      <div>
        <font-awesome-icon
          role="button"
          @click="$emit('close', true)"
          :icon="['fas', 'xmark']"
        />
      </div>
    </div>

    <div class="mobile-menu__body">
      <ul>
        <template v-if="!$auth.loggedIn || $auth?.user?.role_id === 3">
          <li>
            <nuxt-link to="/student" @click.native="$emit('close')">الرئيسية</nuxt-link>
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/student#about-us"
              >نبذة بسيطة</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/student#about-physics"
              >عن الفيزياء</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/student#courses-list"
              >قائمة الكورسات</nuxt-link
            >
          </li>
        </template>
        <template v-if="$auth.loggedIn && $auth?.user?.role_id === 3">
          <li>
            <nuxt-link @click.native="$emit('close')" to="/student/my-courses"
              >كورساتي</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/student/profile"
              > حسابي</nuxt-link
            >
          </li>
        </template>

        <template v-if="!$auth.loggedIn">
          <li>
            <nuxt-link @click.native="$emit('close')" to="/auth/login"
              >تسجيل الدخول</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/auth/signup">
              إنشاء حساب</nuxt-link
            >
          </li>
        </template>

        <template v-if="$auth.loggedIn && $auth?.user?.role_id != 3">
          <li>
            <nuxt-link @click.native="$emit('close')" to="/dashboard">
              المستخدمين</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/dashboard/courses">
              الكورسات</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/dashboard/questions-bank">
              بنك الأسئلة</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/dashboard/exam-correction">
              تصحيح الإختبارات</nuxt-link
            >
          </li>
          <li>
            <nuxt-link @click.native="$emit('close')" to="/dashboard/subscription-codes">
              أكواد الإشتراك</nuxt-link
            >
          </li>
        </template>

        <li @click="logout()" v-if="$auth.loggedIn" class="text-danger">تسجيل الخروج</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProfileDropdown from "../Students/ProfileDropdown.vue";
export default {
  props: {},
  methods: {
    logout() {
      this.$auth.logout();
      this.$emit("close");
      this.$router.push("/auth/login");
    },
  },
};
</script>
