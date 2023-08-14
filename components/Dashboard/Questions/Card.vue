<template>
  <div class="question-card">
    <h6 class="font-h6 font--regular mb-4">{{ question.title }}</h6>

    <div class="d-flex gap-2 align-items-end flex-wrap justify-content-between">
      <div>
        <span class="d-block font-h6 font--light" v-if="question.lesson">
          {{ question.lesson.name }}
        </span>

        <span
          class="d-block font-h6 font--light text-success"
          v-if="question.difficulty == 1"
        >
          سهل
        </span>
        <span
          class="d-block font-h6 font--light text-warning"
          v-if="question.difficulty == 2"
        >
          متوسط
        </span>
        <span
          class="d-block font-h6 font--light text-danger"
          v-if="question.difficulty == 3"
        >
          صعب
        </span>
      </div>

      <div>
        <Button
          @click.native="$emit('openDetails')"
          padding="0.5rem 1rem 0.5rem 0"
          type="null"
          text=""
          :center="true"
        >
          <template>
            <img src="@/assets/imgs/dashboard/vuesax-bulk-frame.svg" alt="" />
          </template>
        </Button>

        <Button
          padding="0.5rem 1rem 0.5rem 0"
          :type="'danger-plain'"
          text=""
          :center="true"
        >
          <template>
            <img src="@/assets/imgs/dashboard/trash-bulk.svg" alt="" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    question: {
      required: true,
    },
  },
};
</script>
