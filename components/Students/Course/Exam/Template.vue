<template>
  <div class="exam-template">
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="d-flex gap-2 align-items-center">
          <img src="@/assets/imgs/course-imgs/test-primary.svg" alt="" />
          <div>
            <h6 class="font-h5 mb-0 font--regular">اختبار الدرس الأول</h6>
            <span class="font--light font-h6">الاختبار الخاص بالدرس</span>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="d-flex gap-2 align-items-center flex-row-reverse">
          <div class="exam-template__timer d-flex align-items-center gap-2">
            <div>
              <img src="@/assets/imgs/course-imgs/timer-broken.svg" alt="" />
              <span class="font-h5">مدة الاختبار : </span>
            </div>
            <h6 class="font-h4 mb-0 exam-template__mins">04:32</h6>
          </div>
        </div>
      </div>
    </div>

    <div>
      <swiper :options="swiperOption" class="mb-5">
        <swiper-slide v-for="(x, i) in 15" :key="i">
          <button
            @click="activeQuestion = i"
            class="question-number"
            :class="i == activeQuestion ? 'active' : ''"
          >
            {{ i + 1 }}
          </button>
        </swiper-slide>

        <button class="swiper-button-prev" slot="button-prev"></button>
        <button class="swiper-button-next" slot="button-next"></button>
      </swiper>
    </div>

    <div>
      <ExamQuestion
        :questionIndex="activeQuestion"
        :question="currQuestion"
        @goNext="goNext"
        @goPrev="goPrev"
        @submit="$emit('submit')"
      />
    </div>
  </div>
</template>

<script>
import ExamQuestion from "./ExamQuestion.vue";
export default {
  components: {
    ExamQuestion,
  },
  methods: {
    goNext() {
      if (this.activeQuestion == 14) {
        return;
      }
      this.activeQuestion++;
    },
    goPrev() {
      if (this.activeQuestion == 0) {
        return;
      }
      this.activeQuestion--;
    },
  },
  data() {
    return {
      currQuestion: {
        type: "choose",
        title: "أي من الأشكال التالية يمثل  الإجابة ؟",
        items: [
          {
            title: "الإجابة الأولى",
            img: "https://i.ibb.co/dmhLJyw/Group-1852.png",
          },
          {
            title: "الإجابة الثانية",
            img: "https://i.ibb.co/RjbJvnf/Group-1853.png",
          },
          {
            title: "الإجابة الثالثة",
            img: "https://i.ibb.co/jL8T5mC/Group-1855.png",
          },
          {
            title: "الإجابة الرابعة",
            img: "https://i.ibb.co/pZg81L4/Group-1856.png",
          },
        ],
      },
      activeQuestion: 0,
      swiperOption: {
        autoplay: false,
        breakpoints: {
          1024: {
            slidesPerView: 9,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 8,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          320: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        },

        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>
