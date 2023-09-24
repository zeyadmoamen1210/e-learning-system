<template>
  <div v-loading="loading">
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
                  prop="lesson_id"
                  :rules="[
                    { required: true, message: 'this field is required' },
                  ]"
                >
                  <el-select
                    class="w-100"
                    v-model="addNewQuestion.lesson_id"
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
                </el-form-item>

                <el-form-item
                  class="flex-grow-1"
                  prop="level"
                  :rules="[
                    { required: true, message: 'this field is required' },
                  ]"
                >
                  <el-select
                    class="w-100"
                    v-model="addNewQuestion.level"
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
                  :rules="[
                    { required: true, message: 'this field is required' },
                  ]"
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
                  :rules="[
                    { required: true, message: 'This field is required' },
                  ]"
                >
                  <CustomEditor
                    placeholder="قم بكتابة نص السؤال ؟"
                    :value="title"
                    @setText="setTitle"
                  />
                </el-form-item>

                <div>
                  <AttachPhoto
                    @getPhoto="getQuestionPhoto"
                    title="صورة السؤال"
                  />
                </div>

                <template
                  v-if="
                    addNewQuestion.type !== 'choose_image' &&
                    addNewQuestion.type !== 'paragraph'
                  "
                >
                  <div
                    class="add-choose"
                    v-for="(item, i) in addNewQuestion.answers"
                    :key="i"
                  >
                    <div>
                      <span class="d-block mt-3 answer-index">
                        {{ i + 1 }}
                      </span>
                    </div>
                    <div class="flex-fill">
                      <el-form-item
                        :prop="`answers[${i}]`"
                        :rules="[
                          { required: true, message: 'This field is required' },
                        ]"
                      >
                        <CustomEditor
                          :placeholder="getPlaceholder(i)"
                          :value="answers[i]"
                          @setText="setQuestion(i, $event)"
                        />
                      </el-form-item>
                    </div>
                    <div class="d-block mt-4">
                      <el-radio
                        name="correct_answer"
                        v-model="addNewQuestion.correct_answer"
                        :label="i"
                        >تحديد كإجابة صحيحة</el-radio
                      >
                    </div>
                  </div>
                </template>

                <template v-if="addNewQuestion.type === 'choose_image'">
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(item, i) in addNewQuestion.answers"
                      :key="i"
                    >
                      <div>
                        <div class="d-flex gap-3 mb-4">
                          <div>
                            <span class="d-block mt-3 answer-index">
                              {{ i + 1 }}
                            </span>
                          </div>
                          <div class="d-block mt-4">
                            <el-radio
                              name="correct_answer"
                              v-model="addNewQuestion.correct_answer"
                              :label="i"
                              >تحديد كإجابة صحيحة</el-radio
                            >
                          </div>
                        </div>
                        <div>
                          <AttachPhoto
                            @getPhoto="getAnswerPhoto(i, $event)"
                            title="صورة السؤال"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-if="addNewQuestion.type === 'paragraph'">
                  <div>
                    <el-form-item
                      :prop="`correct_answer`"
                      :rules="[
                        { required: true, message: 'This field is required' },
                      ]"
                    >
                      <CustomEditor
                        placeholder="قم بكتابة الإجابة النموذجية"
                        :value="correct_answer"
                        @setText="setModelAnswer"
                      />
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
import CustomEditor from "@/components/CustomEditor.vue";
import Vue from "vue";

export default {
  layout: "dashboard",
  middleware: ["prevent-student"],
  components: {
    Button,
    AttachPhoto,
    QuestionAddedSuccessfully,
    CustomEditor,
  },
  mounted() {
    this.getLessons();
  },
  data() {
    return {
      title: "",
      answers: ["", "", "", ""],
      correct_answer: "",
      lessons: [],
      loading: false,
      types: [
        { name: "إختياري", value: "choose" },
        { name: "سؤال صور إختيارية", value: "choose_image" },
        { name: "سؤال مقالي", value: "paragraph" },
      ],
      difficultyDegrees: [
        { name: "سهل", value: "LOW" },
        { name: "متوسط", value: "MID" },
        { name: "صعب", value: "HIGH" },
      ],
      questionAddedPopup: false,

      addNewQuestion: {
        lesson_id: "",
        type: "choose",
        level: "",
        answers: ["", "", "", ""],
        correct_answer: 0,
        title: "",
      },
    };
  },
  methods: {
    setQuestion(index, e) {
      // this.addNewQuestion.answers[index] = e.html;
      Vue.set(this.addNewQuestion.answers, index, e.html);
    },
    setModelAnswer(e) {
      this.addNewQuestion.correct_answer = e.html;
    },
    setTitle(e) {
      this.addNewQuestion.title = e.html;
    },
    getQuestionPhoto(e) {
      this.addNewQuestion.image = e;
    },
    getAnswerPhoto(answerIndex, e) {
      this.addNewQuestion.answers[answerIndex] = e;
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
    checkIfFile(input) {
      if ("File" in window && input instanceof File) return true;
      else return false;
    },
    async uploadAllImages(files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
      }
      try {
        const res = await this.$axios.post("/upload", formData);
        return res.data.files;
      } catch (err) {
        return [];
      }
    },
    submitAdd() {
      // this.questionAddedPopup = true;
      this.$refs.addNewQuestionRef.validate(async (valid) => {
        if (valid) {
          try {
            const files = [];
            let itHasMainImage = false;
            if (this.checkIfFile(this.addNewQuestion.image)) {
              itHasMainImage = true;
              files.push(this.addNewQuestion.image);
            }
            // push the answers images if the type 'choose_image'
            if (this.addNewQuestion.type === "choose_image") {
              let imagesError = false;
              this.addNewQuestion.answers.forEach((ele) => {
                if (this.checkIfFile(ele)) {
                  files.push(ele);
                } else {
                  imagesError = true;
                  return;
                }
              });

              if (imagesError) {
                this.$awn.alert("جميع الصور الاجابات مطلوبة");

                return;
              }
            }
            this.loading = true;
            if (files.length > 0) {
              let images = await this.uploadAllImages(files);
              if (itHasMainImage) {
                this.addNewQuestion.image = images.shift();
              }
              if (images.length > 0) {
                this.addNewQuestion.answers = this.addNewQuestion.answers.map(
                  (ele) => {
                    ele = images.shift();
                    return ele;
                  }
                );
              }
            }
            await this.$axios.post("/questions", this.addNewQuestion);
            this.$router.push("/dashboard/questions-bank");
            this.$awn.success("تم إضافة السؤال بنجاح");
          } catch (err) {
            this.loading = false;
            this.$awn.alert("حدث خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
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
