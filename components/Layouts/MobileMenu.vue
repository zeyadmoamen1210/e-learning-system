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
        <li>
          <nuxt-link @click.native="$emit('close')" to="/student/my-courses"
            >كورساتي</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click.native="$emit('close')" to="/student/profile/edit"
            >تعديل بياناتي</nuxt-link
          >
        </li>

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
      </ul>
    </div>
  </div>
</template>

<script>
import ProfileDropdown from "../Students/ProfileDropdown.vue";
export default {
  props: {},
};
</script>
