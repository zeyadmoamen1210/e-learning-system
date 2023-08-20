<template>
  <div class="app-navbar">
    <div class="container">
      <div class="app-navbar__inner">
        <div class="row align-items-center">
          <div class="col-9 col-lg-3">
            <div>
              <img src="@/assets/imgs/navbar-imgs/logo.png" alt="" />
            </div>
          </div>

          <div class="col-lg-6 d-none d-lg-block">
            <div class="app-navbar__list">
              <ul>
                <li>
                  <nuxt-link enter-active-class="active-link" to="/student"
                    >الرئيسية</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link enter-active-class="active-link" to="/student#about-us"
                    >نبذة بسيطة</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link enter-active-class="active-link" to="/student#about-physics">
                    عن الفيزياء</nuxt-link
                  >
                </li>
                <li>
                  <nuxt-link enter-active-class="active-link" to="/student#courses-list"
                    >قائمة الكورسات</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 d-flex flex-row-reverse d-none d-lg-block">
            <div class="app-navbar__btns" v-if="!isLoggedIn">
              <button @click="$router.push('/auth/login')" class="app-navbar__btn--login">
                تسجيل الدخول
              </button>
              <button
                @click="$router.push('/auth/signup')"
                class="app-navbar__btn--signup"
              >
                إنشاء حساب
              </button>
            </div>
            <ProfileDropdown :from_dashboard="from_dashboard" v-else />
          </div>

          <div class="col-3 d-flex flex-row-reverse d-block d-lg-none">
            <font-awesome-icon
              role="button"
              :icon="['fas', 'bars']"
              size="lg"
              @click="openMenu = true"
              style="color: #fff"
            />
          </div>
        </div>
      </div>
      <MobileMenu v-if="openMenu" @close="openMenu = false" />
    </div>
  </div>
</template>

<script>
import ProfileDropdown from "../Students/ProfileDropdown.vue";

import MobileMenu from "./MobileMenu.vue";

export default {
  components: {
    MobileMenu,
    ProfileDropdown,
  },
  props: {
    from_dashboard: {
      required: false,
      default: false,
    },
  },
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
  },
};
</script>
