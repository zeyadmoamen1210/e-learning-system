<template>
  <div class="row">
     <div class="col-md-6">
      <div class="home-page__img">
       <img
        style="max-width: 38rem"
        class="w-100"
        src="@/assets/imgs/landing-page/user.png"
        alt=""
      />
      </div>
    </div>
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
            <h4 class="font--primary font-h2 font--regular mb-3 typing"></h4>
          </vue-typed-js>
        </div>

        <span class="font--primary font-h3 font--regular home-page__title-2">
          كل ما يلزم مادة الفيزياء أصبح سهلا
        </span>

        <p class="mt-5 font--light home-page__desc d-none d-md-block">
          معلم خبير الفيزياء
          <br>
          خبرة 25 عامًا من الخبرة
          <br>
        معد كتاب الصفوة فى الفيزياء
        </p>

        <p class="mt-5 font--light home-page__desc  d-md-none">
          معلم خبير الفيزياء -
          خبرة 25 عامًا من الخبرة -
          معد كتاب الصفوة فى الفيزياء
        </p>
      </div>
    </div>

  </div>
</template>
<script setup>
</script>
