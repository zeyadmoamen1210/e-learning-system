<template>
  <div class="course-header">
    <div class="container">
      <div class="row row-gap-4 align-items-center">
        <div class="col-md-6 col-lg-7">
          <div>
            <h4 class="course-header__name font-h4 mb-4">
              <span> {{ course.name }} </span>
              <span class="course-header__offer-perc" v-if="+course.discount > 0">
                خصم {{ +course.discount }} جنية
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
                {{ Number(minutesToHours(+course.duration)).toFixed(2) }} ساعة
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
                <span class="font--orange" v-if="course.price - +course.discount > 0">{{ course.price - +course.discount }} جنية</span>
                <span class="font--orange" v-else> مجاناً </span>
                <span
                  v-if="+course.discount > 0"
                  class="course-header__rather-than font-h5"
                >
                  بدلاً من
                  <span> {{ course.price }} </span>
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
                <a
                  class="button button--icon button--whatsapp"
                  :href="generateWhatsAppLink('+201092225757')"
                  target="_blank"
                >
                  <img src="@/assets/imgs/course-imgs/whatsapp.png" alt="" />
                  <span>واتساب</span>
                </a>
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

        <div class="col-md-12">
          <div class="d-flex gap-5 align-items-center flex-wrap">
            <div class="course-material-counts-item">
              <div class="course-material-counts-item__number font-h5 font--bold"> +  {{course.video_count}}</div>
              <div class="course-material-counts-item__title font-h6">فيديوهات</div>
            </div>

            <div class="course-material-counts-item" style="background: #b3b3b354">
              <div class="course-material-counts-item__number font-h5 font--bold"> + {{course.pdf_count}} </div>
              <div class="course-material-counts-item__title font-h6">ملفات</div>
            </div>

            <div class="course-material-counts-item" style="background: #ff005f21">
              <div class="course-material-counts-item__number font-h5 font--bold"> +  {{course.exam_count}}</div>
              <div class="course-material-counts-item__title font-h6">إمتحانات</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <SubscribeCoursePopup
      :isOpened="openCourseSubscribeCourse"
      @close="openCourseSubscribeCourse = false"
      :course_id="course.id"
      @reload="$emit('reload')"
    />

    <SubscriptionDoneSuccessfully
      :isOpened="openSubscriptionDoneSuccessfully"
      @close="openSubscriptionDoneSuccessfully = false"
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
      if (process.client) {
        window.open(link, "_blank");
      }
    },
    courseLink() {
      if (process.client) {
        return `${window?.location?.origin}/student/course/${this.course.id}/preview`;
      }
    },
    generateWhatsAppLink(phoneNumber) {
      let message = `السلام عليكم و رحمة اللٌه و بركاته
      \n ** أريد الإشتراك في هذا الكورس \n ** المادة/  الفيزياء \n ** اسم الكورس/ ${
        this.course.name
      } \n ** كود الكورس/ ${this.course.id} \n ** رابط الكورس/  \n  ${this.courseLink()}
      `;
      // Encode the message and replace line breaks with %0A
      const encodedMessage = encodeURIComponent(message)
        .replace(/%20/g, "%20")
        .replace(/%0A/g, "%0A");

      // Construct the WhatsApp link
      const link = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

      return link;
    },
    openPopup() {
      console.log("open pop up");
      location.reload();
    },
    subscribe() {
      if (!this.$auth.loggedIn) {
        this.$router.push("/auth/login");
      } else {
        this.openCourseSubscribeCourse = true;
      }
      // @click="openCourseSubscribeCourse = !openCourseSubscribeCourse"
    },
  },
};
</script>
