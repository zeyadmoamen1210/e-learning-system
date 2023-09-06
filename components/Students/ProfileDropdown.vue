<template>
  <section>
    <div class="d-flex gap-3 flex-row-reverse">
      <!-- <button class="profile-notification">
        <span class="profile-notification__number">5</span>
        <img
          src="@/assets/imgs/navbar-imgs/notification-broken-notification.svg"
          alt=""
        />
      </button> -->
      <button
        class="profile-dropdown"
        v-if="$auth.user.role_id == 3"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
      >
        <div class="d-flex justify-content-between gap-4 align-items-center">
          <div class="d-flex justify-content-between gap-2 align-items-center">
            <img src="@/assets/imgs/navbar-imgs/vuesax-linear-profile.svg" alt="" />
            <h6 class="font-h6 mb-0 text-white">{{ $auth?.user?.name }}</h6>
          </div>
          <div>
            <img
              class="profile-dropdown__arrow"
              src="@/assets/imgs/navbar-imgs/arrow-circle-right.svg"
              alt=""
            />
          </div>
        </div>
        <div class="profile-dropdown__list" v-if="isDropdownActive">
          <ul>
            <li>
              <img src="@/assets/imgs/navbar-imgs/vuesax-linear-edit.svg" alt="" />
              <span
                @click="$router.push('/student/profile/edit')"
                class="font-h6 font--bold"
                >تعديل بياناتى
              </span>
            </li>
            <li role="button" @click="logout()">
              <img src="@/assets/imgs/navbar-imgs/vuesax-linear-logout.svg" alt="" />
              <span class="font-h6 font--bold font--danger">تسجيل الخروج</span>
            </li>
          </ul>
        </div>
      </button>

      <div class="d-flex" v-if="$auth.user.role_id != 3">
        <div class="profile-dropdown">
          <div class="d-flex justify-content-between gap-4 align-items-center">
            <div class="d-flex justify-content-between gap-2 align-items-center">
              <img src="@/assets/imgs/navbar-imgs/vuesax-linear-profile.svg" alt="" />
              <h6 class="font-h6 mb-0 text-white">{{ $auth?.user?.name }}</h6>
            </div>
          </div>
        </div>
        <div
          role="button"
          @click="logout()"
          class="button--danger px-2 profile-dropdown__logout"
        >
          <img src="@/assets/imgs/navbar-imgs/export-twotone.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/auth/login");
    },
    mouseOver(e) {
      this.isDropdownActive = true;
    },
    mouseLeave(e) {
      this.isDropdownActive = false;
    },
  },
};
</script>
