<template>
  <div>
    <div class="d-flex gap-2 justify-content-between align-items-center">
      <div>
        <h6 class="font-h5">إجاباتك بالاختبار</h6>
        <p class="font-h6 font--light">عرض جميع اجاباتك بالاختبار</p>
      </div>
      <div>
        <h6 class="font-h4 text-plain-success">
          درجتك : {{ examData?.userLastSolution?.mark }} من {{ totalMarks() }}
        </h6>
        <h6 class="font-h4 text-center">
          {{
            Number((examData?.userLastSolution?.mark * 100) / totalMarks()).toFixed(2)
          }}%
        </h6>
      </div>
    </div>

    <div>
      <div
        v-for="(item, index) in answers?.exam?.exam_questions_with_answer"
        :key="index"
        style="border-bottom: 1px solid #ddd"
        class="mb-3 pb-3"
      >
        <ExamQuestion
          :questionIndex="index"
          :question="item"
          :openedSolution="answers?.userLastSolution?.id"
          :solutionAnswers="answers?.solutionAnswer"
          :showAnswers="true"
        />

        <div>
          <div>
            <div v-if="item.type === 'choose_image'">
              <span class="answer-box__your-ans" v-if="isNaN(+getMyAnswer(item) + 1)">
                لم يتم الإجابة علي السؤال
              </span>
            </div>

            <div v-else-if="item.type === 'choose'">
              <span class="answer-box__your-ans" v-if="isNaN(+getMyAnswer(item) + 1)">
                لم يتم الإجابة علي السؤال
              </span>
            </div>

            <div v-else>
              <span class="answer-box__your-ans" v-if="!getMyAnswer(item)">
                لم يتم الإجابة علي السؤال
              </span>
            </div>
          </div>

          <div v-if="item.type != 'paragraph'">
            <h6
              class="font-h5 mb-0 text-success font--bold"
              v-if="getMyAnswer(item) == item?.correct_answer"
            >
              <img src="@/assets/imgs/course-imgs/success.svg" alt="" />
              صحيحة
            </h6>
            <h6
              class="font-h5 mb-0 text-danger font--bold"
              v-if="getMyAnswer(item) != item?.correct_answer"
            >
              <img src="@/assets/imgs/course-imgs/danger.svg" alt="" />
              خاطئة
            </h6>
          </div>
          <div v-else>
            <h6
              class="font-h5 mb-0 text-success font--bold"
              v-if="+getQuestionMark(item) > 0"
            >
              <img src="@/assets/imgs/course-imgs/success.svg" alt="" />
              صحيحة
            </h6>
            <h6 class="font-h5 mb-0 text-danger font--bold" v-else>
              <img src="@/assets/imgs/course-imgs/danger.svg" alt="" />
              خاطئة
            </h6>
          </div>

          <div>
            <h6 class="font-h5 mt-3 mb-3">
              درجتك في السؤال : {{ +getQuestionMark(item) || 0 }} من {{ item.mark }}
            </h6>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="model-answer-container mt-4">
      <div
        v-for="(item, index) in answers?.exam?.exam_questions_with_answer"
        :key="index"
        class="answer-box"
      >
        <div class="d-flex gap-3 align-items-center mb-4">
          <span class="answer-box__num"> {{ index + 1 }} </span>
          <h6 class="font-h5 mb-0">{{ item.title }}</h6>
        </div>
        <div class="mb-4" v-viewer>
          <img role="button" class="answer-box__img" :src="item.image" alt="" />
        </div>
        <div v-viewer class="d-flex gap-4 flex-wrap" v-if="item.type === 'choose_image'">
          <div
            style="padding: 3px"
            :style="{
              border:
                item.correct_answer == index
                  ? '5px solid green'
                  : getMyAnswer(item) == index
                  ? '5px solid red'
                  : '',
            }"
            v-for="(img, index) in item?.answers"
          >
            <img role="button" class="answer-box__img" :src="img" alt="" />
          </div>
        </div>
        <div class="d-flex gap-4 flex-wrap" v-if="item.type === 'choose'">
          <div v-for="(ele, index) in item?.answers">
            <h6
              class="font-h5"
              style="padding: 3px"
              :style="{
                border:
                  item.correct_answer == index
                    ? '5px solid green'
                    : getMyAnswer(item) == index
                    ? '5px solid red'
                    : '',
              }"
            >
              {{ ele }}
            </h6>
          </div>
        </div>

        <div class="d-flex gap-5 align-items-center mt-4 flex-wrap">
          <div>
            <div
              class="d-flex gap-2 align-items-center mb-2 flex-wrap"
              v-if="item.type === 'choose_image'"
            >
              <span class="answer-box__your-ans-title">إجابتك : </span>
              <span class="answer-box__your-ans" v-if="!isNaN(+getMyAnswer(item) + 1)">
                الصورة رقم {{ +getMyAnswer(item) + 1 }}
              </span>
              <span class="answer-box__your-ans" v-else> لم يتم الإجابة علي السؤال </span>
            </div>

            <div
              class="d-flex gap-2 align-items-center mb-2 flex-wrap"
              v-else-if="item.type === 'choose'"
            >
              <span class="answer-box__your-ans-title">إجابتك : </span>

              <span class="answer-box__your-ans" v-if="!isNaN(+getMyAnswer(item) + 1)">
                الإجابة رقم {{ +getMyAnswer(item) + 1 }}
              </span>
              <span class="answer-box__your-ans" v-else> لم يتم الإجابة علي السؤال </span>
            </div>

            <div class="d-flex gap-2 align-items-center mb-2 flex-wrap" v-else>
              <span class="answer-box__your-ans-title">إجابتك : </span>
              <span class="answer-box__your-ans" v-if="getMyAnswer(item)">
                {{ getMyAnswer(item) }}
              </span>
              <span class="answer-box__your-ans" v-else> لم يتم الإجابة علي السؤال </span>
            </div>

            <div
              class="d-flex gap-2 align-items-center"
              v-if="item.type === 'choose_image'"
            >
              <span class="answer-box__your-ans-title">الإجابة الصحيحة : </span>
              <span class="answer-box__your-ans">
                الصورة رقم {{ +item.correct_answer + 1 }}
              </span>
            </div>

            <div
              class="d-flex gap-2 align-items-center"
              v-else-if="item.type === 'choose'"
            >
              <span class="answer-box__your-ans-title">الإجابة الصحيحة : </span>
              <span class="answer-box__your-ans">
                الإجابة رقم {{ +item.correct_answer + 1 }}
              </span>
            </div>

            <div class="d-flex gap-2 align-items-center" v-else>
              <span class="answer-box__your-ans-title">الإجابة الصحيحة : </span>
              <span class="answer-box__your-ans"> {{ item.correct_answer }} </span>
            </div>
          </div>

          <div v-if="item.type != 'paragraph'">
            <h6
              class="font-h5 mb-0 text-success font--bold"
              v-if="getMyAnswer(item) == item?.correct_answer"
            >
              <img src="@/assets/imgs/course-imgs/success.svg" alt="" />
              صحيحة
            </h6>
            <h6
              class="font-h5 mb-0 text-danger font--bold"
              v-if="getMyAnswer(item) != item?.correct_answer"
            >
              <img src="@/assets/imgs/course-imgs/danger.svg" alt="" />
              خاطئة
            </h6>
          </div>
          <div v-else>
            <h6
              class="font-h5 mb-0 text-success font--bold"
              v-if="+getQuestionMark(item) > 0"
            >
              <img src="@/assets/imgs/course-imgs/success.svg" alt="" />
              صحيحة
            </h6>
            <h6 class="font-h5 mb-0 text-danger font--bold" v-else>
              <img src="@/assets/imgs/course-imgs/danger.svg" alt="" />
              خاطئة
            </h6>
          </div>
          <div>
            درجتك في السؤال : {{ +getQuestionMark(item) || 0 }} من {{ item.mark }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import ExamQuestion from "../ExamQuestion.vue";

export default {
  components: {
    ExamQuestion,
  },
  props: {
    answers: {
      required: true,
    },
    examData: {
      required: true,
    },
  },
  methods: {
    totalMarks() {
      const examQuestions =
        this.examData?.exam?.exam_questions_with_answer ||
        this.examData?.exam?.exam_questions;
      return examQuestions?.reduce((prev, curr) => (prev += +curr.mark), 0);
    },
    getMyAnswer(item) {
      return this.answers?.solutionAnswer.find((ele) => {
        return ele.question_id === item?.pivot?.question_id;
      })?.selected_answer;
    },
    getQuestionMark(item) {
      return this.answers?.solutionAnswer.find((ele) => {
        return ele.question_id === item?.pivot?.question_id;
      })?.mark;
    },
  },
};
</script>

<style lang="scss">
.model-answer-container {
  > div {
    padding: 2rem;
    &:nth-of-type(odd) {
      background-color: #f7f7f7;
    }
  }
}
.answer-box {
  &__img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }
  &__num {
    display: block;
    background: #008dd2;
    height: 3.5rem;
    width: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    border-radius: 50%;
    color: #fff;
  }
  &__your-ans {
    color: #8d8d8d;
  }
  &__your-ans-title {
    color: #8d8d8d;
    font-weight: bold;
  }
}
</style>
