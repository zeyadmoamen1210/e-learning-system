<template>
  <div class="app-navbar">
    <div class="container">
      <div class="app-navbar__inner">
        <div class="row align-items-center">
          <div class="col-md-3">
            <div>
              <img src="@/assets/imgs/navbar-imgs/logo.png" alt="" />
            </div>
          </div>

          <div class="col-lg-6 d-none d-lg-block">
            <div class="app-navbar__list">
              <ul>
                <li>
                  <nuxt-link to="/student">الرئيسية</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/student#about-us">نبذة بسيطة</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/student#about-physics"> عن الفيزياء</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/student#courses-list">قائمة الكورسات</nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 d-flex flex-row-reverse d-none d-lg-block">
            <div class="app-navbar__btns" v-if="!isLoggedIn">
              <button class="app-navbar__btn--login">تسجيل الدخول</button>
              <button class="app-navbar__btn--signup">إنشاء حساب</button>
            </div>
            <ProfileDropdown v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileDropdown from "../Students/ProfileDropdown.vue";
export default {
  components: {
    ProfileDropdown,
  },
  data() {
    return {
      isLoggedIn: true,
    };
  },
};
</script>
