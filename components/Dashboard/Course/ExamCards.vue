<template>
  <div v-loading="loading">
    <div>
      <div class="d-flex gap-3 mb-4 flex-wrap">
        <div v-for="(exam, index) in exams" :key="index">
          <Button
            padding="1.3rem 2.5rem"
            @click.native="(activeExam = index), getExamWithQuestion(exam.id)"
            :type="activeExam === index ? 'btn-orange' : 'orange-plain'"
            :text="exam.title"
          ></Button>
        </div>
        <div>
          <Button
            @click.native="addExamPopup = true"
            padding="1.3rem 2.5rem"
            :type="'text-orange'"
            :text="'إضافة اختبار جديد'"
          >
            <template>
              <img src="@/assets/imgs/dashboard/add-circle-bulk-09.svg" alt="" />
            </template>
          </Button>
        </div>
      </div>

      <div v-if="activeExam != null">
        <div class="d-flex gap-3 flex-wrap">
          <div class="d-flex gap-5 align-items-center lesson-exam__box">
            <div class="d-flex gap-2 align-items-center">
              <img src="@/assets/imgs/dashboard/question-primary.svg" alt="" />
              <h6 class="mb-0 font-h6">عنوان الاختبار</h6>
            </div>
            <div>
              <h6 class="mb-0 font-h6 font--bold">{{ exams[activeExam].title }}</h6>
            </div>
          </div>

          <div class="d-flex gap-5 align-items-center lesson-exam__box">
            <div class="d-flex gap-2 align-items-center">
              <img src="@/assets/imgs/dashboard/timer-broken.svg" alt="" />
              <h6 class="mb-0 font-h6">حدد المدة الزمنية لحل الاختبار</h6>
            </div>
            <div>
              <h6 class="mb-0 font-h6 font--bold">
                {{ exams[activeExam]?.content?.duration }} دقائق
              </h6>
            </div>
          </div>

          <div class="d-flex gap-5 align-items-center lesson-exam__box">
            <div class="d-flex gap-2 align-items-center">
              <img src="@/assets/imgs/dashboard/calendar-2-linear.svg" alt="" />
              <h6 class="mb-0 font-h6">حدد درجة النجاح للاختبار</h6>
            </div>
            <div>
              <h6 class="mb-0 font-h6 font--bold">
                {{ exams[activeExam]?.content?.pass_from }}
              </h6>
            </div>
          </div>

          <div>
            <Button
              @click.native="updateExamPopup = true"
              padding="1.3rem"
              :center="true"
              :type="'primary'"
              text=""
            >
              <template>
                <img src="@/assets/imgs/dashboard/edit-2-bulk.svg" alt="" />
              </template>
            </Button>
          </div>
        </div>
        <div>
          <div
            v-if="examWithQuestions.questions?.length === 0"
            class="m-auto text-center mt-5"
          >
            <img src="@/assets/imgs/dashboard/questions-new.svg" alt="" />
            <h6 class="font-h6 mb-0 font--bold mt-3">لا يوجد أسئلة</h6>
            <span class="font-h6 font--light d-block mb-3 mt-3">
              لم تقم بإضافة أي سؤال للاختبار
            </span>
            <Button
              padding="1.1rem 2.3rem"
              :type="'success-plain'"
              :text="'فتح بنك الأسئلة لاختيار أسئلة الاختبار'"
              textClasses="font-h6"
              @click.native="bankQuestionPopup = true"
            >
              <template>
                <img src="@/assets/imgs/dashboard/question-white.svg" alt="" />
              </template>
            </Button>
          </div>

          <div v-else>
            <div>
              <div
                class="mt-5 d-flex gap-2 flex-wrap align-items-center justify-content-between"
              >
                <div>
                  <h6 class="d-flex align-items-center gap-3">
                    <img src="@/assets/imgs/dashboard/Polygon.svg" alt="" />
                    <span class="font-h6 font--bold"
                      >الأسئلة التي تم اختيارها من بنك الأسئلة للاختبار</span
                    >
                  </h6>
                </div>

                <div>
                  <Button
                    padding="1.1rem 2.3rem"
                    :type="'success-plain'"
                    :text="'فتح بنك الأسئلة لاختيار أسئلة الاختبار'"
                    textClasses="font-h6"
                    @click.native="bankQuestionPopup = true"
                  >
                    <template>
                      <img src="@/assets/imgs/dashboard/question-white.svg" alt="" />
                    </template>
                  </Button>
                </div>
              </div>
              <div class="d-flex gap-3 flex-wrap mt-4 align-items-center">
                <span class="font-h6 font--light"> مجموع درجات الاختبار : </span>
                <span class="font-h3 d-block font--bold text-plain-success">
                  {{ totalMarks }}
                </span>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-4 mt-4"
                v-for="(question, index) in examWithQuestions.questions"
                :key="index"
              >
                <QuestionCard
                  @openDetails="
                    (currQuestion = question.question), (questionDetailsPopup = true)
                  "
                  :question="question"
                  @openDelete="(currQuestion = question), (deleteQuestionPopup = true)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddExamPopup
      :isOpened="addExamPopup"
      :lessonId="lessonId"
      :course="course"
      @close="addExamPopup = false"
      @added="$emit('reloadCourse')"
    />

    <UpdateExamPopup
      :isOpened="updateExamPopup"
      v-if="updateExamPopup && activeExam != null"
      :exam="exams[activeExam]"
      :lessonId="lessonId"
      @close="updateExamPopup = false"
      @added="$emit('reloadCourse')"
    />

    <QuestionDetails
      @close="questionDetailsPopup = false"
      :isOpened="questionDetailsPopup"
      :question="currQuestion"
    />

    <DeleteQuestion
      @delete="deleteCurrQuestionFromExam()"
      :isOpened="deleteQuestionPopup"
      @close="deleteQuestionPopup = false"
      :loading="deleteLoading"
      :text="` هل انت متأكد من حذف هذا السؤال من الامتحان `"
      :title="`حذف السؤال من الامتحان`"
    />

    <bankQuestionPopup
      v-if="bankQuestionPopup"
      :isOpened="bankQuestionPopup"
      @close="bankQuestionPopup = false"
      :exam="exams[activeExam]"
      :examAddedQuestions="examWithQuestions?.questions"
      @reloadExam="getExamWithQuestion(exams[activeExam]?.id)"
    />
  </div>
</template>

<script>
import AddExamPopup from "@/components/Dashboard/Popups/AddExam.vue";
import UpdateExamPopup from "@/components/Dashboard/Popups/UpdateExam.vue";
import Button from "@/components/Layouts/Button.vue";
import QuestionDetails from "@/components/Dashboard/Popups/QuestionDetails.vue";
import DeleteQuestion from "@/components/Dashboard/Popups/DeleteQuestion.vue";
import bankQuestionPopup from "@/components/Dashboard/Popups/bankQuestion.vue";

import QuestionCard from "@/components/Dashboard/Questions/Card.vue";

export default {
  components: {
    AddExamPopup,
    Button,
    UpdateExamPopup,
    QuestionDetails,
    DeleteQuestion,
    QuestionCard,
    bankQuestionPopup,
  },
  props: {
    lessonId: {
      required: true,
    },
    course: {
      required: true,
    },
    exams: {
      required: true,
    },
  },
  computed: {
    totalMarks() {
      return this.examWithQuestions?.questions?.reduce(
        (prev, curr) => prev + curr.mark,
        0
      );
    },
  },
  data() {
    return {
      addExamPopup: false,
      activeExam: null,
      updateExamPopup: false,
      loading: false,
      examWithQuestions: {},
      questionDetailsPopup: false,
      deleteQuestionPopup: false,
      deleteLoading: false,
      currQuestion: {},
      bankQuestionPopup: false,
    };
  },
  methods: {
    async deleteCurrQuestionFromExam() {
      this.deleteLoading = true;
      try {
        await this.$axios.delete(`/exam-questions/${this.currQuestion.id}`);
        this.deleteQuestionPopup = false;
        this.$notify({
          title: "تم بنجاح",
          message: "تم حذف السؤال من الامتحان بنجاح",
          type: "success",
        });
        this.getExamWithQuestion(this.exams[this.activeExam]?.id);
      } catch (err) {
        this.$notify.error({
          title: "خطأ",
          message: "حدث خطأ ما",
        });
      } finally {
        this.deleteLoading = false;
      }
    },
    async getExamWithQuestion(examId) {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/exams/${examId}`);
        this.examWithQuestions = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
