<template>
  <div class="course-header">
    <div class="container">
      <div class="row row-gap-4 align-items-center">
        <div class="col-md-6 col-lg-7">
          <div>
            <h4 class="course-header__name font-h4 mb-4">
              <span>مبادئ أساسيات الفيزياء</span>
              <span class="course-header__offer-perc" v-if="isHasOffer">20%</span>
            </h4>
            <div class="d-flex gap-2 align-items-center flex-wrap">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/timer-broken.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">مدة الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 font--orange">4 ساعات</h6>
            </div>

            <div class="d-flex gap-2 align-items-center mt-3" v-if="!isSubscribedIn">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/vuesax-broken-wallet.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">سعر الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 d-flex gap-4 flex-wrap align-items-end">
                <span class="font--orange">720 جنية</span>

                <span v-if="isHasOffer" class="course-header__rather-than font-h5">
                  بدلاً من <span>900</span> جنية
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-5">
          <div v-if="!isSubscribedIn">
            <div>
              <button
                @click="openCourseSubscribeCourse = !openCourseSubscribeCourse"
                class="button button--primary w-100 mb-4"
              >
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
                  :description="`أريد الإشتراك في هذا الكورس \n** الاسم/  زياد مؤمن السيد \n ** المُعلم/  مدكور سلامة \n ** المادة/  الفيزياء \n ** اسم الكورس/  الفزياء الحديثة \n ** رابط الكورس/  \n  localhost:3000/student/course/1/preview`"
                >
                  <img src="@/assets/imgs/course-imgs/whatsapp.png" alt="" />
                  <span>واتساب</span>
                </ShareNetwork>
              </div>
            </div>
          </div>
          <div v-else class="d-flex gap-2 flex-row-reverse flex-wrap">
            <button class="button button--icon button--telegram">
              <img src="@/assets/imgs/course-imgs/telegram.svg" alt="" />
              <span class="font-h6">الانضمام إلى جروب التليجرام</span>
            </button>
            <button class="button button--icon button--whatsapp-dark">
              <img src="@/assets/imgs/course-imgs/708.svg" alt="" />
              <span class="font-h6">الانضمام إلى جروب الواتساب</span>
            </button>
          </div>
        </div>

        <div class="col-md-12">
          <p>
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن
            التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.
            ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما-
            للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو
            (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات
            الويب تستخدم لوريم
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
    isHasOffer: {
      default: false,
      type: Boolean,
    },
    isSubscribedIn: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      openCourseSubscribeCourse: false,
      openSubscriptionDoneSuccessfully: false,
    };
  },
  methods: {
    openPopup() {
      console.log("open pop up");
      location.reload();
    },
  },
};
</script>
