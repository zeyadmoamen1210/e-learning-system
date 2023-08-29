<template>
  <div>
    <Popup
      :contentCentered="false"
      :maxWidth="'120rem'"
      :open="isOpened"
      @close="$emit('close', false)"
    >
      <template #header></template>
      <template #body>
        <div v-loading="loading">
          <div class="mt-5">
            <div class="mb-4">
              <h6 class="mb-0 font-h4 text-end mb-2">بنك الأسئلة</h6>
              <p class="mb-0 font-h5 font--light text-end d-block">
                قم بتحديد الأسئلة التي تريد وضعها بالاختبار
              </p>
            </div>

            <div class="mb-3 d-flex flex-wrap gap-2 align-items-center">
              <div>
                <el-select
                  @change="getBankQuestions"
                  v-model="lesson_id"
                  placeholder="اختر الدرس"
                >
                  <el-option
                    v-for="(item, index) in lessons"
                    :key="index"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <el-select
                  @change="getBankQuestions"
                  v-model="type"
                  placeholder="نوع السؤال"
                >
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :value="item.val"
                    :label="item.title"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <el-select
                  @change="getBankQuestions"
                  v-model="level"
                  placeholder="درجة الصعوبة"
                >
                  <el-option
                    v-for="(item, index) in levels"
                    :key="index"
                    :value="item.val"
                    :label="item.title"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="mt-4">
              <Button
                padding="1.3rem 2.5rem"
                @click.native="activeTab = 0"
                :type="activeTab == 0 ? 'primary' : 'primary-plain'"
                :text="'بنك الأسئلة'"
              ></Button>
              <Button
                padding="1.3rem 2.5rem"
                @click.native="activeTab = 1"
                :type="activeTab == 1 ? 'primary' : 'primary-plain'"
                :text="'الأسئلة التي تم اختيارها'"
              ></Button>
              <Button
                padding="1.3rem 2.5rem"
                @click.native="activeTab = 2"
                :type="activeTab == 2 ? 'primary' : 'primary-plain'"
                :text="'أسئلة الإمتحان'"
              ></Button>
            </div>

            <div v-if="activeTab == 0">
              <div class="row mt-3">
                <div class="col-md-4" v-for="(question, index) in questions" :key="index">
                  <QuestionCard
                    @openDetails="
                      (currQuestion = question), (questionDetailsPopup = true)
                    "
                    :question="question"
                    :no-update-delete="true"
                    :checkIfExistInExam="true"
                  >
                    <template #checkIfExistInExam>
                      <Button
                        padding="0.5rem 1rem 0.5rem 0"
                        type="primary"
                        @click.native="addToExam(question.question || question)"
                        text=""
                        :center="true"
                        v-if="
                          !ifQuestionAddedToExam(question.question?.id || question.id)
                        "
                      >
                        <template>
                          <font-awesome-icon
                            :icon="['fas', 'check']"
                            style="color: #fff"
                          />
                        </template>
                      </Button>
                      <Button
                        padding="0.5rem 1rem 0.5rem 0"
                        type="danger-plain"
                        text=""
                        :center="true"
                        v-else
                        @click.native="
                          removeFromExam(question.question?.id || question.id)
                        "
                      >
                        <template>
                          <font-awesome-icon
                            :icon="['fas', 'trash']"
                            style="color: #f00"
                          />
                        </template>
                      </Button>
                    </template>
                  </QuestionCard>
                </div>
              </div>

              <div class="d-flex flex-row-reverse" v-if="total > 1">
                <el-pagination
                  :current-page.sync="page"
                  background
                  layout="prev, pager, next"
                  :total="total * 10"
                  @current-change="getBankQuestions"
                >
                </el-pagination>
              </div>
            </div>

            <div v-if="activeTab == 1" style="max-height: 300px; overflow-y: scroll">
              <div class="container">
                <div class="row mt-3">
                  <div
                    class="col-md-4"
                    v-for="(question, index) in examQuestions"
                    :key="index"
                  >
                    <QuestionCard
                      @openDetails="
                        (currQuestion = question.question || question),
                          (questionDetailsPopup = true)
                      "
                      :question="question"
                      :no-update-delete="true"
                      :checkIfExistInExam="true"
                      :add-mark="true"
                    >
                      <template #checkIfExistInExam>
                        <Button
                          padding="0.5rem 1rem 0.5rem 0"
                          type="danger-plain"
                          text=""
                          :center="true"
                          @click.native="
                            removeFromExam(question.question?.id || question.id)
                          "
                        >
                          <template>
                            <font-awesome-icon
                              :icon="['fas', 'trash']"
                              style="color: #f00"
                            />
                          </template>
                        </Button>
                      </template>
                    </QuestionCard>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab == 2" style="max-height: 300px; overflow-y: scroll">
              <div class="container">
                <div class="row mt-3">
                  <div
                    class="col-md-4"
                    v-for="(question, index) in examAddedQuestions"
                    :key="index"
                  >
                    <QuestionCard
                      @openDetails="
                        (currQuestion = question.question || question),
                          (questionDetailsPopup = true)
                      "
                      :question="question"
                      :no-update-delete="true"
                      :checkIfExistInExam="true"
                      :add-mark="true"
                    >
                      <template #checkIfExistInExam>
                        <Button
                          padding="0.5rem 1rem 0.5rem 0"
                          type="danger-plain"
                          text=""
                          :center="true"
                          @click.native="
                            (currQuestion = question), (deleteQuestionPopup = true)
                          "
                        >
                          <template>
                            <font-awesome-icon
                              :icon="['fas', 'trash']"
                              style="color: #f00"
                            />
                          </template>
                        </Button>
                      </template>
                    </QuestionCard>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="d-flex flex-row-reverse"
              v-if="examQuestions.length > 0 && activeTab == 1"
            >
              <Button
                padding="1.2rem"
                type="primary"
                text="تأكيد"
                :center="true"
                @click.native="submitAddQuestionsToExam()"
              >
              </Button>
            </div>

            <div
              class="d-flex flex-row-reverse"
              v-if="examAddedQuestions.length > 0 && activeTab == 2"
            >
              <Button
                padding="1.2rem"
                type="primary"
                text="تأكيد"
                :center="true"
                @click.native="submitAddQuestionsToExam(examAddedQuestions)"
              >
              </Button>
            </div>
          </div>

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
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/Layouts/Popup.vue";
import Button from "@/components/Layouts/Button.vue";
import QuestionCard from "@/components/Dashboard/Questions/Card.vue";
import QuestionDetails from "@/components/Dashboard/Popups/QuestionDetails.vue";
import DeleteQuestion from "@/components/Dashboard/Popups/DeleteQuestion.vue";

export default {
  components: {
    Popup,
    Button,
    QuestionCard,
    QuestionDetails,
    DeleteQuestion,
  },
  props: {
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
    exam: {
      required: true,
    },
    examAddedQuestions: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      lesson_id: null,
      level: null,
      type: null,
      activeTab: 0,
      lessons: [],
      total: 1,
      page: 1,
      questions: [],
      deleteLoading: false,
      questionDetailsPopup: false,
      currQuestion: {},
      deleteQuestionPopup: false,

      examQuestions: [],
      types: [
        { title: "اختياري", val: "choose" },
        { title: "اختياري بصور", val: "choose_image" },
        { title: "مقالي", val: "paragraph" },
      ],
      levels: [
        { title: "سهل", val: "LOW" },
        { title: "متوسط", val: "MID" },
        { title: "صعب", val: "HIGH" },
      ],
    };
  },
  watch: {
    activeTab(val) {
      if (val == 0) {
        this.getBankQuestions();
      }
    },
  },
  mounted() {
    this.getBankQuestions();
    this.getLessons();
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
        this.$emit("reloadExam");
      } catch (err) {
        this.$notify.error({
          title: "خطأ",
          message: "حدث خطأ ما",
        });
      } finally {
        this.deleteLoading = false;
      }
    },
    async submitAddQuestionsToExam(questions = this.examQuestions) {
      this.loading = true;
      try {
        let error = false;
        questions.forEach((ele) => {
          if (!ele.mark || ele.mark < 0) {
            error = true;
            return;
          }
        });
        if (error) {
          this.$notify.error({
            title: "خطأ",
            message: "يجب ادخال درجة لكل الاسئلة وتكون اكبر من الصفر",
          });
          return;
        }
        const questionsArray = questions.map((ele) => {
          return { id: ele.question?.id || ele.id, mark: ele.mark };
        });
        const res = await this.$axios.post(`/exams/${this.exam.id}/questions`, {
          questions: questionsArray,
        });
        this.$emit("reloadExam");
        // this.$emit("close");
        this.examQuestions = [];
        this.activeTab = 2;
        this.$notify({
          title: "تم بنجاح",
          message: "تم إضافة الأسئلة بنجاح",
          type: "success",
        });
      } catch (err) {
        console.log(err);
        this.$notify.error({
          title: " خطأ",
          message: " حدث خطأ ما",
        });
      } finally {
        this.loading = false;
      }
    },
    ifQuestionAddedToExam(questionId) {
      return (
        this.examQuestions.findIndex(
          (ele) => (ele.question?.id || ele.id) === questionId
        ) > -1
      );
    },
    addToExam(question) {
      this.examQuestions.push(question);
    },
    removeFromExam(questionId) {
      const index = this.examQuestions.findIndex(
        (ele) => (ele.question?.id || ele.id) === questionId
      );
      this.examQuestions.splice(index, 1);
    },
    async getLessons() {
      this.loading = true;
      try {
        const res = await this.$axios.get("/lessons");
        this.lessons = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async getBankQuestions() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/questions`, {
          params: {
            page: this.page,
            level: this.level,
            type: this.type,
            lesson_id: this.lesson_id,
            limit: 6,
            exam_id: this.exam.id,
          },
        });
        console.log(res);
        this.questions = res.data.data;
        this.page = res.data.current_page;
        this.total = res.data.last_page;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
