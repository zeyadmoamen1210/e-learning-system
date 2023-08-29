<template>
  <div class="course-header">
    <div class="container">
      <div class="row row-gap-4 align-items-center">
        <div class="col-md-6 col-lg-7">
          <div>
            <h4 class="course-header__name font-h4 mb-4">
              <span> {{ course.name }} </span>
              <span class="course-header__offer-perc" v-if="+course.discount > 0">
                {{ +course.discount }}%
              </span>
            </h4>
            <div class="d-flex gap-2 align-items-center flex-wrap">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/timer-broken.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">مدة الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 font--orange">
                {{ minutesToHours(+course.duration) }} ساعة
              </h6>
            </div>

            <div class="d-flex gap-2 align-items-center mt-3" v-if="!isSubscribedIn">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/vuesax-broken-wallet.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">سعر الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 d-flex gap-4 flex-wrap align-items-end">
                <span class="font--orange">{{ course.price }} جنية</span>

                <span
                  v-if="+course.discount > 0"
                  class="course-header__rather-than font-h5"
                >
                  بدلاً من
                  <span> {{ beforeDiscount }} </span>
                  جنية
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5">
          <div v-if="!isSubscribedIn">
            <div>
              <button @click="subscribe()" class="button button--primary w-100 mb-4">
                الاشتراك بالكورس
              </button>
            </div>

            <div class="d-flex gap-4">
              <div>
                <p class="light-font">
                  أو تواصل معنا من خلال الواتساب للحصول على كود إشتراك
                </p>
              </div>
              <div>
                <ShareNetwork
                  class="button button--icon button--whatsapp"
                  network="whatsapp"
                  url=""
                  @open="openPopup"
                  title="السلام عليكم و رحمة اللٌه و بركاته"
                  :description="subscriptionMessage()"
                >
                  <img src="@/assets/imgs/course-imgs/whatsapp.png" alt="" />
                  <span>واتساب</span>
                </ShareNetwork>
              </div>
            </div>
          </div>
          <div v-else class="d-flex gap-2 flex-row-reverse flex-wrap">
            <button
              v-if="course.telegram"
              @click="join(course.telegram)"
              class="button button--icon button--telegram"
            >
              <img src="@/assets/imgs/course-imgs/telegram.svg" alt="" />
              <span class="font-h6">الانضمام إلى جروب التليجرام</span>
            </button>
            <button
              v-if="course.whatsapp"
              @click="join(course.whatsapp)"
              class="button button--icon button--whatsapp-dark"
            >
              <img src="@/assets/imgs/course-imgs/708.svg" alt="" />
              <span class="font-h6">الانضمام إلى جروب الواتساب</span>
            </button>
          </div>
        </div>

        <div class="col-md-12">
          <p>
            {{ course.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- <SubscribeCoursePopup
      :isOpened="openCourseSubscribeCourse"
      @close="openCourseSubscribeCourse = false"
    /> -->
    <SubscriptionDoneSuccessfully
      :isOpened="openCourseSubscribeCourse"
      @close="openCourseSubscribeCourse = false"
    />
  </div>
</template>

<script>
import SubscribeCoursePopup from "@/components/Students/Course/Popups/SubscribeCoursePopup.vue";
import SubscriptionDoneSuccessfully from "@/components/Students/Course/Popups/SubscriptionDoneSuccessfully.vue";
export default {
  components: {
    SubscribeCoursePopup,
    SubscriptionDoneSuccessfully,
  },
  props: {
    isSubscribedIn: {
      default: false,
      type: Boolean,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      openCourseSubscribeCourse: false,
      openSubscriptionDoneSuccessfully: false,
    };
  },

  computed: {
    beforeDiscount() {
      return +this.course.price + +this.course.price * (+this.course.discount / 100);
    },
  },
  methods: {
    join(link) {
      window.open(link, "_blank");
    },
    subscriptionMessage() {
      return `أريد الإشتراك في هذا الكورس \n ** المُعلم/  مدكور سلامة \n ** المادة/  الفيزياء \n ** اسم الكورس/ ${this.course.name} \n ** رابط الكورس/  \n  localhost:3000/student/course/${this.course.id}/preview
      `;
    },
    openPopup() {
      console.log("open pop up");
      location.reload();
    },
    subscribe() {
      if (!this.$auth.loggedIn) {
        this.$router.push("/auth/login");
      }
      // @click="openCourseSubscribeCourse = !openCourseSubscribeCourse"
    },
  },
};
</script>
