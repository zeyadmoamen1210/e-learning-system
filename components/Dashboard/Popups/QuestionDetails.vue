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
              v-if="question.difficulty == 1"
            >
              سهل
            </span>
            <span
              class="d-block font-h5 font--light text-warning"
              v-if="question.difficulty == 2"
            >
              متوسط
            </span>
            <span
              class="d-block font-h5 font--light text-danger"
              v-if="question.difficulty == 3"
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
              {{ question.answer }}
            </p>
          </div>

          <div
            class="question-answers mt-5"
            v-if="question.type === 'choose' && question.images.length === 0"
          >
            <div
              :class="question.answer === index ? 'correct-answer' : ''"
              v-for="(item, index) in question.options"
              :key="index"
            >
              <span class="answer-index"> {{ index + 1 }} </span>
              <span class="font-h5 answer-name"> {{ item }} </span>
            </div>
          </div>

          <div
            class="mt-5"
            v-if="question.type === 'choose' && question.images.length != 0"
          >
            <div class="row">
              <div
                class="col-md-6 mb-4"
                v-for="(item, index) in question.options"
                :key="index"
              >
                <div class="question-answers mb-2">
                  <div :class="question.answer === index ? 'correct-answer' : ''">
                    <span class="answer-index"> {{ index + 1 }} </span>
                    <span class="font-h5 answer-name"> {{ item }} </span>
                  </div>
                </div>
                <div>
                  <img :src="question.images[index]" />
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
