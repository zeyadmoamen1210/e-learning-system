<template>
  <div class="exam-template" v-loading="loading">
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="d-flex gap-2 align-items-center">
          <img src="@/assets/imgs/course-imgs/test-primary.svg" alt="" />
          <div>
            <h6 class="font-h5 mb-0 font--regular">{{ exam?.exam?.title }}</h6>
            <span class="font--light font-h6"> {{ exam?.exam?.description }} </span>
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
            <div>
              <vac
                @finish="endExam"
                ref="vac1"
                :end-time="
                  new Date(exam?.openedSolution?.created_at).getTime() +
                  exam?.exam?.content?.duration * 60000
                "
              >
                <template v-slot:process="{ timeObj }">
                  <div class="d-flex justify-content-center gap-1">
                    <h6 class="exam-template__mins mb-0 font-h4">
                      {{ ` ${timeObj.s}` }}
                    </h6>
                    <h6 class="exam-template__mins mb-0 font-h4">:</h6>
                    <h6 class="exam-template__mins mb-0 font-h4">
                      {{ ` ${timeObj.m}` }}
                    </h6>
                    <h6 class="exam-template__mins mb-0 font-h4">:</h6>
                    <h6 class="exam-template__mins mb-0 font-h4">
                      {{ ` ${timeObj.h}` }}
                    </h6>
                  </div>
                </template>
                <span slot="finish"> تم إنتهاء الوقت </span>
              </vac>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <swiper :options="swiperOption" class="mb-5">
        <swiper-slide v-for="(question, i) in exam?.exam?.exam_questions" :key="i">
          <button
            @click="setActiveQuestion(i)"
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
        v-if="reload"
        :questionIndex="activeQuestion"
        :question="exam?.exam?.exam_questions?.[activeQuestion]"
        :openedSolution="exam?.openedSolution?.id"
        :solutionAnswers="exam?.solutionAnswer"
      />
    </div>

    <div>
      <ExamFooter
        v-if="reload"
        :questionIndex="activeQuestion"
        :questionsLenght="exam?.exam?.exam_questions?.length"
        @goNext="goNext"
        @goPrev="goPrev"
        @submit="$emit('submit')"
      />
    </div>
  </div>
</template>

<script>
import ExamQuestion from "./ExamQuestion.vue";
import ExamFooter from "./ExamFooter.vue";
export default {
  components: {
    ExamQuestion,
    ExamFooter,
  },
  props: {
    exam: {
      required: true,
    },
  },
  methods: {
    async setActiveQuestion(index) {
      this.reload = false;
      this.activeQuestion = index;
      await this.$nextTick();
      this.reload = true;
    },
    endExam() {
      this.$emit("timeFinished");
    },
    async goNext() {
      if (this.activeQuestion == 14) {
        return;
      }
      this.reload = false;
      this.activeQuestion++;
      await this.$nextTick();
      this.reload = true;
    },
    async goPrev() {
      if (this.activeQuestion == 0) {
        return;
      }
      this.reload = false;
      this.activeQuestion--;
      await this.$nextTick();
      this.reload = true;
    },
  },
  data() {
    return {
      reload: true,
      loading: false,

      activeQuestion: 0,
      submitExamLoading: false,
      examCorrected: false,
      swiperOption: {
        autoplay: false,
        breakpoints: {
          1024: {
            slidesPerView: 8,
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
