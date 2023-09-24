<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div>
          <side-menu :list="sideMenuList" />
        </div>
      </div>
      <div class="col-md-9">
        <div>
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from "~/components/Students/Profile/SideMenu.vue";

export default {
  components: {SideMenu},
  middleware: ["not-admin"],
  data() {
    return {
      sideMenuList: [
        {
          title: 'تعديل البيانات',
          iconClasses: ['fas', 'user'],
          link: '/student/profile'
        },
        {
          title: 'تغير كلمة المرور',
          iconClasses: ['fas', 'unlock-keyhole'],
          link: '/student/profile/change-password'
        },
        {
          title: 'إحصائياتي',
          iconClasses: ['fas', 'chart-simple'],
          link: '/student/profile/course-statistics'
        },
        {
          title: 'كورساتي',
          iconClasses: ['fas', 'chart-simple'],
          link: '/student/profile/courses'
        },
      ],
    }
  }
}
</script>
