<template>
  <div class="app-navbar">
    <div class="container">
      <div class="app-navbar__inner">
        <div class="row align-items-center">
          <div class="col-9 col-lg-3">
            <div>
              <img
                @click="$router.push('/')"
                src="@/assets/imgs/logo.png"
                style="width: 70px"
                alt=""
              />
            </div>
          </div>

          <div class="col-lg-6 d-none d-lg-block">
            <div class="app-navbar__list">
              <ul>
                <template
                  v-if="($auth.loggedIn && $auth.user?.role_id == 3) || !$auth.loggedIn"
                >
                  <li>
                    <nuxt-link enter-active-class="active-link" to="/student"
                      >الرئيسية</nuxt-link
                    >
                  </li>
<!--                  <li>-->
<!--                    <nuxt-link enter-active-class="active-link" to="/student#about-us"-->
<!--                      >نبذة بسيطة</nuxt-link-->
<!--                    >-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <nuxt-link-->
<!--                      enter-active-class="active-link"-->
<!--                      to="/student#about-physics"-->
<!--                    >-->
<!--                      عن الفيزياء</nuxt-link-->
<!--                    >-->
<!--                  </li>-->
                  <li>
                    <nuxt-link enter-active-class="active-link" to="/student#courses-list"
                      >قائمة الكورسات</nuxt-link
                    >
                  </li>
                  <li v-if="$auth.loggedIn && $auth?.user?.role_id == 3">
                    <nuxt-link enter-active-class="active-link" to="/student/my-courses">
                      كورساتي</nuxt-link
                    >
                  </li>
                </template>
                <template v-else>
                  <li>
                    <nuxt-link enter-active-class="active-link" to="/dashboard"
                      >المستخدمين</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link enter-active-class="active-link" to="/dashboard/courses"
                      >الكورسات</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      enter-active-class="active-link"
                      to="/dashboard/questions-bank"
                      >بنك الأسئلة</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      enter-active-class="active-link"
                      to="/dashboard/exam-correction"
                      >تصحيح الاختبارات</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      enter-active-class="active-link"
                      to="/dashboard/subscription-codes"
                      >أكواد الإشتراك</nuxt-link
                    >
                  </li>
                </template>
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
            <ProfileDropdown v-else />
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
