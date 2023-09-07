<template>
  <div class="exam-template" v-loading="loading" id="exam-player">
    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="d-flex gap-2 align-items-center">
          <div class="d-flex gap-2 align-items-center">
            <Button
              class="fullscreen-btn"
              @click.native="requestFullscreen()"
              padding="1rem 0rem"
              :type="'text-primary'"
              :text="''"
            >
              <template>
                <font-awesome-icon
                  style="font-size: 2.5rem; color: #008dd2"
                  :icon="['fas', 'expand']"
                />
              </template>
            </Button>
            <Button
              class="exit-fullscreen-btn"
              @click.native="closeFullscreen()"
              padding="1rem 0rem"
              :type="'text-primary'"
              :text="''"
            >
              <template>
                <font-awesome-icon
                  style="font-size: 2.5rem; color: red"
                  :icon="['fas', 'xmark']"
                />
              </template>
            </Button>
            <div>
              <img src="@/assets/imgs/course-imgs/test-primary.svg" alt="" />
            </div>
          </div>

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

    <div class="exam-template__content">
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

      <div v-if="exam?.exam?.exam_questions?.length > 0">
        <ExamQuestion
          v-if="reload"
          :questionIndex="activeQuestion"
          @clickToImg="closeFullscreen"
          :question="exam?.exam?.exam_questions?.[activeQuestion]"
          :openedSolution="exam?.openedSolution?.id"
          :solutionAnswers="exam?.solutionAnswer"
        />
      </div>
      <div v-else>
        <h6 class="text-danger font-h6 text-center">لا يوجد أسئلة في هذا الإمتحان</h6>
      </div>

      <div>
        <ExamFooter
          v-if="reload"
          :questionIndex="activeQuestion"
          :questionsLenght="exam?.exam?.exam_questions?.length"
          @goNext="goNext"
          @goPrev="goPrev"
          @submit="closeFullscreen(), $emit('submit')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ExamQuestion from "./ExamQuestion.vue";
import ExamFooter from "./ExamFooter.vue";
import Button from "@/components/Layouts/Button.vue";

export default {
  components: {
    ExamQuestion,
    ExamFooter,
    Button,
  },
  props: {
    exam: {
      required: true,
    },
  },
  methods: {
    requestFullscreen() {
      let el = document.getElementById("exam-player");
      el.webkitRequestFullscreen();
    },
    openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },

    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    async setActiveQuestion(index) {
      this.reload = false;
      this.activeQuestion = index;
      await this.$nextTick();
      this.reload = true;
    },
    endExam() {
      this.closeFullscreen();
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
