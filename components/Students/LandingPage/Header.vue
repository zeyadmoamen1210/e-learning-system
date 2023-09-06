<template>
  <div class="row">
    <div class="col-md-6">
      <div>
        <div class="home-page__title">
          <vue-typed-js
            :autoInsertCss="true"
            :loop="true"
            :typeSpeed="70"
            :smartBackspace="true"
            :strings="['المنصة التعليمية', 'للأستاذ مدكور سلامة', 'في علوم الفيزياء']"
          >
            <h4 class="font--primary font-h1 font--regular mb-3 typing"></h4>
          </vue-typed-js>
        </div>

        <span class="font--primary font-h3 font--regular home-page__title-2">
          كل ما يلزم مادة الفيزياء أصبح سهلا
        </span>

        <p class="mt-5 font--light home-page__desc">
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن
          التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك
          يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
        </p>
      </div>
    </div>
    <div class="col-md-6">
      <div class="home-page__img">
        <img src="@/assets/imgs/landing-page/illustration.png" alt="" />
      </div>
    </div>
  </div>
</template>
