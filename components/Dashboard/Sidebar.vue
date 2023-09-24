<template>
  <div class="sidebar">
    <ul>

      <li>
        <nuxt-link class="align-items-center" to="/dashboard">

          <font-awesome-icon style="color: #404040" :icon="['fas', 'chart-simple']" />


          <span> الإحصائيات </span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/dashboard/users">
          <img
            v-if="$route.path !== '/dashboard/users'"
            src="@/assets/imgs/dashboard/profile-2user-linear.svg"
            alt=""
          />

          <img
            v-else
            src="@/assets/imgs/dashboard/primary/profile-2user-linear.svg"
            alt=""
          />

          <span> المستخدمين </span>
        </nuxt-link>
      </li>



      <li>
        <nuxt-link to="/dashboard/courses">
          <img
            v-if="$route.path !== '/dashboard/courses'"
            src="@/assets/imgs/dashboard/note-linear.svg"
            alt=""
          />

          <img v-else src="@/assets/imgs/dashboard/primary/note-linear.svg" alt="" />

          <span> الكورسات </span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/dashboard/questions-bank">
          <img
            v-if="$route.path !== '/dashboard/questions-bank'"
            src="@/assets/imgs/dashboard/question.svg"
            alt=""
          />

          <img v-else src="@/assets/imgs/dashboard/primary/question.svg" alt="" />

          <span> بنك الأسئلة </span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/dashboard/exam-correction">
          <img
            v-if="$route.path !== '/dashboard/exam-correction'"
            src="@/assets/imgs/dashboard/task-linear.svg"
            alt=""
          />

          <img v-else src="@/assets/imgs/dashboard/primary/task-linear.svg" alt="" />

          <span> تصحيح الاختبارات </span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/dashboard/subscription-codes">
          <img
            v-if="$route.path !== '/dashboard/subscription-codes'"
            src="@/assets/imgs/dashboard/tag-linear.svg"
            alt=""
          />

          <img v-else src="@/assets/imgs/dashboard/primary/tag-linear.svg" alt="" />

          <span> أكواد الإشتراك </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
