<template>
  <div class="course-header">
    <div class="container">
      <div class="row row-gap-4">
        <div class="col-md-6 col-lg-8">
          <div>
            <h4 class="course-header__name font-h4 mb-4">
              <span>مبادئ أساسيات الفيزياء</span>
              <span class="course-header__offer-perc" v-if="isHasOffer">20%</span>
            </h4>
            <div class="d-flex gap-2 align-items-center mb-3 flex-wrap">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/timer-broken.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">مدة الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 font--orange">4 ساعات</h6>
            </div>

            <div class="d-flex gap-2 align-items-center">
              <div class="d-flex gap-2 align-items-center">
                <div>
                  <img src="@/assets/imgs/course-imgs/vuesax-broken-wallet.png" alt="" />
                </div>
                <h6 class="mb-0 font-h6">سعر الكورس :</h6>
              </div>
              <h6 class="mb-0 font-h6 d-flex gap-4 flex-wrap align-items-end">
                <span class="font--orange">720 جنية</span>

                <span v-if="isHasOffer" class="course-header__rather-than font-h5">
                  بدلاً من 900 جنية
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div>
            <div>
              <button
                @click="openCourseSubscribeCourse = !openCourseSubscribeCourse"
                class="button button--primary w-100 mb-4"
              >
                الاشتراك بالكورس
              </button>
            </div>

            <div class="d-flex gap-2">
              <div>
                <p class="light-font">
                  أو تواصل معنا من خلال الواتساب للحصول على كود إشتراك
                </p>
              </div>
              <div>
                <button class="button button--icon button--whatsapp">
                  <img src="@/assets/imgs/course-imgs/whatsapp.png" alt="" />
                  <span>واتساب</span>
                </button>
              </div>
            </div>
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

    <SubscribeCoursePopup
      :isOpened="openCourseSubscribeCourse"
      @close="openCourseSubscribeCourse = false"
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
    isHasOffer: {
      required: true,
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
};
</script>
