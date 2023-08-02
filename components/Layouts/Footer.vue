<template>
    <div>
      <div class="app-footer">

        <div class="container">
          <div class="app-footer__inner">
            <div class="row align-items-end">

                <div class="col-12 col-lg-5 ">
                  <div class="app-footer__about">
                    <div>
                      <img src="@/assets/imgs/navbar-imgs/logo.png" alt="">
                    </div>
                    <p>
                      هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم 
                    </p>
                  </div>
                </div>

                <div class="col-6 col-lg-2 ">
                    <div>
                      <ul class="app-footer__list">
                        <li>
                          <nuxt-link to="#">الرئيسية</nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="#">نبذة بسيطة</nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="#">التسجيل بالموقع</nuxt-link>
                        </li>
                      </ul>
                    </div>
                </div>


                <div class="col-6 col-lg-2 ">
                    <div>
                      <ul class="app-footer__list">
                        <li>
                          <nuxt-link to="#">الرئيسية</nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="#">نبذة بسيطة</nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="#">التسجيل بالموقع</nuxt-link>
                        </li>
                      </ul>
                    </div>
                </div>


                <div class="col-12 col-lg-3 ">
                    <div class="app-footer__follow">
                      <h6>أو تابعنا على</h6>
                      <div class="app-footer__follow-btns">
                        <button>
                          <font-awesome-icon :icon="['fab', 'facebook-f']" />
                        </button>

                        <button>
                          <font-awesome-icon :icon="['fab', 'facebook-f']" />
                        </button>

                        <button>
                          <font-awesome-icon :icon="['fab', 'facebook-f']" />
                        </button>

                        <button>
                          <font-awesome-icon :icon="['fab', 'facebook-f']" />
                        </button>
                      </div>
                    </div>
                </div>

            </div>
          </div>
        </div>

      </div>

      <div class="app-footer__copy">
        <h6 class="text-center"> &copy; جميع الحقوق محفوظة - مدكور سلامة 2023 </h6>
      </div>
    </div>
</template>

<script>
export default {
  
}
</script>