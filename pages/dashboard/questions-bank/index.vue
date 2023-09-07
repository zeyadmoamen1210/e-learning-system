<template>
  <div v-loading.fullscreen="loading">
    <div v-if="!loading">
      <div>
        <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
          <div>
            <h6 class="font-h4 font--regular">بنك الأسئلة</h6>
            <p class="font--light font-h5">
              يمكنك فلترة الأسئلة من أجل الوصول للأسئلة بشكل أسرع
            </p>
          </div>
          <div>
            <Button
              @click.native="$router.push('/dashboard/questions-bank/add')"
              padding="1.2rem 1.5rem"
              textClasses="font-h5 font--regular"
              type="success"
              text="إضافة  سؤال جديد"
            >
              <template>
                <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
              </template>
            </Button>
          </div>
        </div>

        <div class="d-flex gap-2 flex-wrap">
          <el-select
            @change="getBankQuestions"
            clearable
            v-model="lesson"
            placeholder="أختر الدرس"
          >
            <el-option
              v-for="item in lessons"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-select
            @change="getBankQuestions"
            clearable
            v-model="type"
            placeholder="نوع السؤال"
          >
            <el-option
              v-for="item in types"
              :key="item.val"
              :label="item.title"
              :value="item.val"
            >
            </el-option>
          </el-select>

          <el-select
            @change="getBankQuestions"
            clearable
            v-model="difficulty"
            placeholder="درجة الصعوبة"
          >
            <el-option
              v-for="item in difficultyDegrees"
              :key="item.val"
              :label="item.title"
              :value="item.val"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="mt-5">
        <div class="container">
          <div v-if="questions.length === 0">
            <NoData :text="'لا توجد بيانات متوفرة'" />
          </div>
          <div class="row" v-else>
            <div class="col-md-4" v-for="(question, index) in questions" :key="index">
              <QuestionCard
                @openDetails="(currQuestion = question), (questionDetailsPopup = true)"
                :question="question"
                @openDelete="(currQuestion = question), (deleteQuestionPopup = true)"
                :text="` هل انت متأكد من حذف هذا السؤال   `"
                :title="`حذف السؤال  `"
              />
            </div>
          </div>

          <div class="d-flex flex-row-reverse" v-if="total > 1">
            <el-pagination
              :current-page.sync="currPage"
              background
              layout="prev, pager, next"
              :total="total * 10"
              @current-change="getBankQuestions"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <QuestionDetails
        @close="questionDetailsPopup = false"
        :isOpened="questionDetailsPopup"
        :question="currQuestion"
      />

      <DeleteQuestion
        @delete="deleteCurrQuestion()"
        :isOpened="deleteQuestionPopup"
        @close="deleteQuestionPopup = false"
        :loading="deleteLoading"
        :text="` هل انت متأكد من حذف هذا السؤال   `"
        :title="`حذف السؤال  `"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import QuestionCard from "@/components/Dashboard/Questions/Card.vue";
import QuestionDetails from "@/components/Dashboard/Popups/QuestionDetails.vue";
import DeleteQuestion from "@/components/Dashboard/Popups/DeleteQuestion.vue";
import NoData from "@/components/NoData.vue";

export default {
  layout: "dashboard",
  middleware: ["prevent-student"],
  components: {
    Button,
    QuestionCard,
    QuestionDetails,
    DeleteQuestion,
    NoData,
  },
  mounted() {
    this.getBankQuestions();
    this.getLessons();
  },
  methods: {
    async deleteCurrQuestion() {
      this.deleteLoading = true;
      try {
        await this.$axios.delete(`/questions/${this.currQuestion.id}`);
        this.deleteQuestionPopup = false;
        this.$awn.success("تم حذف السؤال بنجاح");

        this.getBankQuestions();
      } catch (err) {
        if (err.response.status === 403) {
          this.$awn.alert("هذا السؤال موجود بالفعل في امتحان");

          return;
        }
        this.$awn.alert("حدث خطأ ما");
      } finally {
        this.deleteLoading = false;
      }
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
            page: this.currPage,
            level: this.difficulty,
            type: this.type,
            lesson_id: this.lesson,
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
  data() {
    return {
      loading: true,
      lesson: null,
      type: null,
      difficulty: null,
      currPage: 1,
      total: 1,
      deleteQuestionPopup: false,
      deleteLoading: false,

      lessons: [],
      types: [
        { title: "اختياري", val: "choose" },
        { title: "اختياري بصور", val: "choose_image" },
        { title: "مقالي", val: "paragraph" },
      ],
      difficultyDegrees: [
        { title: "سهل", val: "LOW" },
        { title: "متوسط", val: "MID" },
        { title: "صعب", val: "HIGH" },
      ],

      questionDetailsPopup: false,
      currQuestion: {},

      questions: [],
    };
  },
};
</script>
