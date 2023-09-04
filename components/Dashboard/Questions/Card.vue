<template>
  <div class="question-card">
    <h6 class="font-h6 font--regular mb-4 question-card__title">
      {{ theQuestion.title }}
    </h6>

    <div class="d-flex gap-2 align-items-end flex-wrap justify-content-between">
      <div>
        <div class="d-flex gap-2 align-items-center" v-if="question.mark && !addMark">
          <span class="font-h6">الدرجة : </span>
          <span class="d-block font--semibold text-plain-success">
            {{ question.mark }}
          </span>
        </div>

        <span class="d-block font-h6 font--light" v-if="theQuestion.lesson">
          {{ theQuestion.lesson.name }}
        </span>

        <span
          class="d-block font-h6 font--light text-success"
          v-if="theQuestion.level == 'LOW'"
        >
          سهل
        </span>
        <span
          class="d-block font-h6 font--light text-warning"
          v-if="theQuestion.level == 'MID'"
        >
          متوسط
        </span>
        <span
          class="d-block font-h6 font--light text-danger"
          v-if="theQuestion.level == 'HIGH'"
        >
          صعب
        </span>
      </div>

      <div v-if="!addMark">
        <Button
          @click.native="$emit('openDetails', theQuestion.id)"
          padding="0.5rem 1rem 0.5rem 0"
          type="null"
          text=""
          :center="true"
        >
          <template>
            <img src="@/assets/imgs/dashboard/vuesax-bulk-frame.svg" alt="" />
          </template>
        </Button>

        <slot name="checkIfExistInExam" />

        <template v-if="!noUpdateDelete">
          <Button
            padding="0.5rem 1rem 0.5rem 0"
            :type="'danger-plain'"
            text=""
            :center="true"
            @click.native="$emit('openDelete')"
          >
            <template>
              <img src="@/assets/imgs/dashboard/trash-bulk.svg" alt="" />
            </template>
          </Button>
          <Button
            padding="0.5rem 1rem 0.5rem 0"
            :type="'primary-plain'"
            text=""
            :center="true"
            @click.native="$router.push(`/dashboard/questions-bank/${theQuestion.id}`)"
          >
            <template>
              <img src="@/assets/imgs/dashboard/vuesax-bulk-edit-2.svg" alt="" />
            </template>
          </Button>
        </template>
      </div>
    </div>
    <div v-if="addMark" class="d-flex gap-2 flex-wrap align-items-center">
      <div class="flex-fill question-mark-input">
        <el-input placeholder="حدد درجة السؤال" v-model.number="question.mark"></el-input>
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

        <slot name="checkIfExistInExam" />
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
  computed: {
    theQuestion() {
      return this.question?.question || this.question;
    },
  },
  props: {
    question: {
      required: true,
    },
    noUpdateDelete: {
      required: false,
      default: false,
    },
    checkIfExistInExam: {
      required: false,
      default: false,
    },
    addMark: {
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.question-mark-input {
  .el-input__inner {
    height: 37px !important;
  }
}
</style>
