<template>
  <div class="question-correct">
    <div class="d-flex flex-wrap justify-content-between">
      <div>
        <h6 class="font-h4 font--regular">
          {{ question?.question?.title }}
        </h6>
        <span class="d-block font-h5 font--light">
          {{ question?.question?.lesson?.name }}
        </span>

        <div>
          <span
            class="d-block font-h5 font--light text-success"
            v-if="question?.question?.level == 'LOW'"
          >
            سهل
          </span>
          <span
            class="d-block font-h5 font--light text-warning"
            v-if="question?.question?.level == 'MID'"
          >
            متوسط
          </span>
          <span
            class="d-block font-h5 font--light text-danger"
            v-if="question?.question?.level == 'HIGH'"
          >
            صعب
          </span>
        </div>
      </div>
      <div>
        <Button
          padding="1rem 4rem"
          :type="'success-plain'"
          :center="true"
          text="عرض الإجابة النموذجية"
          text-classes="font-h5 font--regular"
          @click.native="questionDetailsPopup = true"
        >
        </Button>
      </div>
    </div>

    <div class="mt-5">
      <h6 class="font-h5 font--semibold mt-4 text-plain-success">إجابة الطالب</h6>
      <p class="font-h5 font--light">
        {{ question?.selected_answer }}
      </p>
      <div class="row">
        <div class="col-md-3">
          <div>
            <el-input
              type="number"
              @input="setQuestionMark"
              v-model="question.questionMark"
              class="mt-3"
              placeholder="ضع درجة التصحيح"
            ></el-input>
          </div>
        </div>
      </div>
    </div>

    <QuestionDetails
      @close="questionDetailsPopup = false"
      :isOpened="questionDetailsPopup"
      :question="question?.question"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import QuestionDetails from "@/components/Dashboard/Popups/QuestionDetails.vue";

export default {
  components: {
    Button,
    QuestionDetails,
  },
  props: {
    question: {
      required: true,
    },
  },
  methods: {
    setQuestionMark(e) {
      this.$emit(`setQuestionMark`, {
        mark: +e,
        solution_id: this.question?.id,
      });
    },
  },
  data() {
    return {
      questionDetailsPopup: false,
    };
  },
};
</script>
