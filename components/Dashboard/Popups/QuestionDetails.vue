<template>
  <div>
    <Popup :contentCentered="false" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div class="mt-5 question-details-popup">
          <h6 class="font-h4 font--regular">
            {{ question.title }}
          </h6>
          <span class="d-block font-h5 font--light" v-if="question.lesson">
            {{ question.lesson.name }}
          </span>

          <div>
            <span
              class="d-block font-h5 font--light text-success"
              v-if="question.level == 'LOW'"
            >
              سهل
            </span>
            <span
              class="d-block font-h5 font--light text-warning"
              v-if="question.level == 'MID'"
            >
              متوسط
            </span>
            <span
              class="d-block font-h5 font--light text-danger"
              v-if="question.level == 'HIGH'"
            >
              صعب
            </span>
          </div>

          <div v-if="question.image">
            <img class="question-img" :src="question.image" alt="" />
          </div>

          <div v-if="question.type === 'paragraph'">
            <h6 class="font-h5 font--semibold mt-4 text-plain-success">
              الإجابة النموذجية
            </h6>
            <p class="font-h5 font--light">
              {{ question.correct_answer }}
            </p>
          </div>

          <div class="question-answers mt-5" v-if="question.type === 'choose'">
            <div
              :class="question.correct_answer == index ? 'correct-answer' : ''"
              v-for="(item, index) in question.answers"
              :key="index"
            >
              <span class="answer-index"> {{ index + 1 }} </span>
              <span class="font-h5 answer-name"> {{ item }} </span>
            </div>
          </div>

          <div class="mt-5" v-if="question.type === 'choose_image'">
            <div class="row">
              <div
                class="col-md-6 mb-4"
                v-for="(item, index) in question.answers"
                :key="index"
              >
                <div class="question-answers mb-2">
                  <div :class="question.correct_answer == index ? 'correct-answer' : ''">
                    <span class="answer-index"> {{ index + 1 }} </span>
                    <span class="font-h5 answer-name"> الصورة {{ index + 1 }} </span>
                  </div>
                </div>
                <div>
                  <img class="answer-img" :src="question.answers[index]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/Layouts/Popup.vue";
export default {
  components: {
    Popup,
  },
  props: {
    question: {
      required: true,
    },
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
  },
};
</script>
