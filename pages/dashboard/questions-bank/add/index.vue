<template>
  <div>
    <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
      <div>
        <h6 class="font-h4 font--regular">إضافة سؤال جديد</h6>
        <p class="font--light font-h5">قم بإضافة بيانات السؤال</p>
      </div>
      <div>
        <Button
          @click.native="submitAdd"
          padding="1.2rem 1.5rem"
          textClasses="font-h5 font--regular"
          type="success"
          text="إضافة"
        >
          <template>
            <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
          </template>
        </Button>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div>
            <el-form ref="addNewQuestionRef" :model="addNewQuestion">
              <div class="d-flex gap-2 mb-3 flex-wrap">
                <el-form-item
                  class="flex-grow-1"
                  prop="lesson"
                  :rules="[{ required: true, message: 'this field is required' }]"
                >
                  <el-select
                    class="w-100"
                    v-model="addNewQuestion.lesson"
                    placeholder="أختر الدرس"
                  >
                    <el-option
                      v-for="item in lessons"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  class="flex-grow-1"
                  prop="difficulty"
                  :rules="[{ required: true, message: 'this field is required' }]"
                >
                  <el-select
                    class="w-100"
                    v-model="addNewQuestion.difficulty"
                    placeholder="درجة الصعوبة"
                  >
                    <el-option
                      v-for="item in difficultyDegrees"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  :rules="[{ required: true, message: 'this field is required' }]"
                  class="flex-grow-1"
                  prop="type"
                >
                  <el-select
                    class="w-100"
                    v-model="addNewQuestion.type"
                    placeholder="نوع السؤال"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div>
                <el-form-item
                  prop="title"
                  :rules="[{ required: true, message: 'This field is required' }]"
                >
                  <el-input
                    placeholder="قم بكتابة نص السؤال ؟"
                    v-model="addNewQuestion.title"
                  ></el-input>
                </el-form-item>

                <div v-if="addNewQuestion.type === 'choose-with-photo'">
                  <AttachPhoto />
                </div>

                <template
                  v-if="
                    addNewQuestion.type !== 'choose-with-photos' &&
                    addNewQuestion.type !== 'paragraph'
                  "
                >
                  <div class="add-choose" v-for="(item, i) in addNewQuestion.choose">
                    <div>
                      <span class="d-block mt-3 answer-index"> {{ i + 1 }} </span>
                    </div>
                    <div class="flex-fill">
                      <el-form-item
                        :prop="`choose[${i}].name`"
                        :rules="[{ required: true, message: 'This field is required' }]"
                      >
                        <el-input
                          :placeholder="getPlaceholder(i)"
                          v-model="addNewQuestion.choose[i].name"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="d-block mt-4">
                      <el-radio
                        name="modelAnswer"
                        v-model="addNewQuestion.modelAnswer"
                        :label="i"
                        >تحديد كإجابة صحيحة</el-radio
                      >
                    </div>
                  </div>
                </template>

                <template v-if="addNewQuestion.type === 'choose-with-photos'">
                  <div class="row">
                    <div class="col-md-6" v-for="(item, i) in addNewQuestion.choose">
                      <div>
                        <div class="d-flex gap-3 mb-4">
                          <div>
                            <span class="d-block mt-3 answer-index"> {{ i + 1 }} </span>
                          </div>
                          <div class="d-block mt-4">
                            <el-radio
                              name="modelAnswer"
                              v-model="addNewQuestion.modelAnswer"
                              :label="i"
                              >تحديد كإجابة صحيحة</el-radio
                            >
                          </div>
                        </div>
                        <div>
                          <AttachPhoto />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-if="addNewQuestion.type === 'paragraph'">
                  <div>
                    <el-form-item
                      :prop="`textModelAnswer`"
                      :rules="[{ required: true, message: 'This field is required' }]"
                    >
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="قم بكتابة الإجابة النموذجية"
                        v-model="addNewQuestion.textModelAnswer"
                      ></el-input>
                    </el-form-item>
                  </div>
                </template>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <QuestionAddedSuccessfully
      :isOpened="questionAddedPopup"
      @close="questionAddedPopup = false"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AttachPhoto from "@/components/Layouts/AttachPhoto.vue";
import QuestionAddedSuccessfully from "@/components/Dashboard/Popups/QuestionAdded.vue";
export default {
  layout: "dashboard",
  components: {
    Button,
    AttachPhoto,
    QuestionAddedSuccessfully,
  },
  data() {
    return {
      lessons: [
        { name: "درس 1", value: "lesson 1" },
        { name: "درس 2", value: "lesson 2" },
        { name: "درس 3", value: "lesson 3" },
      ],
      types: [
        { name: "إختياري", value: "choose" },
        { name: "سؤال إختياري بالصورة", value: "choose-with-photo" },
        { name: "سؤال صور إختيارية", value: "choose-with-photos" },
        { name: "سؤال مقالي", value: "paragraph" },
      ],
      difficultyDegrees: [
        { name: "سهل", value: "easy" },
        { name: "متوسط", value: "medium" },
        { name: "صعب", value: "hard" },
      ],
      questionAddedPopup: false,

      addNewQuestion: {
        lesson: "",
        type: "choose",
        difficulty: "",
        choose: [
          {
            name: "",
          },
          {
            name: "",
          },
          {
            name: "",
          },
          {
            name: "",
          },
        ],
        modelAnswer: 0,
      },
    };
  },
  methods: {
    submitAdd() {
      this.questionAddedPopup = true;
      // this.$refs.addNewQuestionRef.validate((valid) => {
      //   if (valid) {
      //   }
      // });
    },
    getPlaceholder(i) {
      let placeholder = "";
      switch (i) {
        case 0:
          placeholder = "اكتب الإجابة الأولى";
          break;
        case 1:
          placeholder = "اكتب الإجابة الثانية";
          break;
        case 2:
          placeholder = "اكتب الإجابة الثالثة";
          break;
        case 3:
          placeholder = "اكتب الإجابة الرابعة";
          break;
      }
      return placeholder;
    },
  },
};
</script>
