<template>
  <div>
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
        <el-select v-model="lesson" placeholder="أختر الدرس">
          <el-option
            v-for="item in lessons"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select v-model="type" placeholder="نوع السؤال">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select v-model="difficulty" placeholder="درجة الصعوبة">
          <el-option
            v-for="item in difficultyDegrees"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="(question, index) in questions" :key="index">
            <QuestionCard
              @openDetails="(currQuestion = question), (questionDetailsPopup = true)"
              :question="question"
            />
          </div>
        </div>
      </div>
    </div>

    <QuestionDetails
      @close="questionDetailsPopup = false"
      :isOpened="questionDetailsPopup"
      :question="currQuestion"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import QuestionCard from "@/components/Dashboard/Questions/Card.vue";
import QuestionDetails from "@/components/Dashboard/Popups/QuestionDetails.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    QuestionCard,
    QuestionDetails,
  },
  data() {
    return {
      lesson: "",
      type: "",
      difficulty: "",

      lessons: [],
      types: [],
      difficultyDegrees: [],

      questionDetailsPopup: false,
      currQuestion: {},

      questions: [
        {
          title: "هنا يكتب نص السؤال ؟",
          lesson: {
            name: "الدرس الأول",
          },
          images: [],
          difficulty: 1,
          type: "choose",
          image: "https://www.dur.ac.uk/images/physics/Labs/skills/equation.png",
          options: [
            "الإجابة الأولى",
            "الإجابة الثانية",
            "الإجابة الثالثة",
            "الإجابة الرابعة",
          ],
          answer: 2,
        },
        {
          title: "هنا يكتب نص السؤال ؟",
          lesson: {
            name: "الدرس الأول",
          },
          images: [
            "https://i.ibb.co/dmhLJyw/Group-1852.png",
            "https://i.ibb.co/RjbJvnf/Group-1853.png",
            "https://i.ibb.co/jL8T5mC/Group-1855.png",
            "https://i.ibb.co/pZg81L4/Group-1856.png",
          ],
          difficulty: 2,
          type: "choose",
          options: [
            "الإجابة الأولى",
            "الإجابة الثانية",
            "الإجابة الثالثة",
            "الإجابة الرابعة",
          ],
          answer: 2,
        },
        {
          title: "هنا يكتب نص السؤال ؟",
          lesson: {
            name: "الدرس الأول",
          },
          images: [],
          difficulty: 3,
          type: "paragraph",
          answer:
            "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما",
        },
      ],
    };
  },
};
</script>
