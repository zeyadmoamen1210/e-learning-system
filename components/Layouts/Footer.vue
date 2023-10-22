<template>
  <div>
    <div class="app-footer">
      <div class="container">
        <div class="app-footer__inner">
          <div class="row align-items-end">
            <div class="col-12 col-md-4">
              <div class="app-footer__about">
                <div>
                  <img src="@/assets/imgs/navbar-imgs/logo.png" alt="" />
                </div>
                <p class="font-h6">
                  معلم خبير الفيزياء
                  <br>
                  خبرة 25 عامًا من الخبرة
                  <br>
                  معد كتاب الصفوة فى الفيزياء
                </p>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <div class="d-flex gap-3 flex-wrap justify-content-around">
                <ul class="app-footer__list">
                  <li>
                    <nuxt-link to="/student">الرئيسية</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/student#about-us">نبذة بسيطة</nuxt-link>
                  </li>
                  <!-- <li>
                    <nuxt-link to="/auth/login">التسجيل بالموقع</nuxt-link>
                  </li> -->
                </ul>

                <ul class="app-footer__list">
                  <li>
                    <nuxt-link to="/student#courses-list">قائمة الكورسات</nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="/student/my-courses">كورساتي</nuxt-link>
                  </li>
                  <!-- <li>
                    <nuxt-link to="/student#courses-list">الشروط والأحكام</nuxt-link>
                  </li> -->
                </ul>
              </div>
            </div>

            <div class="col-12 col-md-3 d-flex justify-content-center">
              <div class="app-footer__follow mt-4">
                <h6>أو تابعنا على</h6>
                <div class="app-footer__follow-btns">
                  <button style="background: #0066c8" @click="open('facebook')">
                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                  </button>

                  <button style="background: #FF0000" @click="open('youtube')">
                    <font-awesome-icon :icon="['fab', 'youtube']" />
                  </button>

                  <button style="background: #25d366" @click="open('whatsapp')">
                    <font-awesome-icon :icon="['fab', 'whatsapp']" />
                  </button>

                  <!-- <button>
                    <font-awesome-icon :icon="['fab', 'linkedin-in']" />
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-footer__copy">
      <h6 class="text-center">&copy; جميع الحقوق محفوظة - مدكور سلامة 2023</h6>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open(type) {
      if (process.client) {
        if (type === "facebook") {
          window.open(process.env.FACEBOOK_LINK, "_blank");
        } else if (type === "youtube") {
          window.open(process.env.YOUTUBE_LINK, "_blank");
        } else if (type == "whatsapp") {
          window.open(process.env.WHATSAPP_LINK, "_blank");
        }
      }
    },
  },
};
</script>
