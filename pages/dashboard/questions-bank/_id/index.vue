<template>
  <div v-loading="loading">
    <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
      <div>
        <h6 class="font-h4 font--regular">تعديل السؤال</h6>
        <p class="font--light font-h5">قم بتعديل بيانات السؤال</p>
      </div>
      <div>
        <Button
          @click.native="submitUpdate"
          padding="1.2rem 1.5rem"
          textClasses="font-h5 font--regular"
          type="success"
          text="تعديل"
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
            <el-form ref="updateQuestionRef" :model="updateQuestion">
              <div class="d-flex gap-2 mb-3 flex-wrap">
                <el-form-item
                  class="flex-grow-1"
                  prop="lesson_id"
                  :rules="[{ required: true, message: 'this field is required' }]"
                >
                  <el-select
                    class="w-100"
                    v-model="updateQuestion.lesson_id"
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
                  :rules="[{ required: true, message: 'this field is required' }]"
                >
                  <el-select
                    class="w-100"
                    v-model="updateQuestion.level"
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
                    v-model="updateQuestion.type"
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
                    v-model="updateQuestion.title"
                  ></el-input>
                </el-form-item>

                <div>
                  <AttachPhoto
                    :image="updateQuestion.image"
                    @getPhoto="getQuestionPhoto"
                    title="صورة السؤال"
                  />
                </div>

                <template
                  v-if="
                    updateQuestion.type !== 'choose_image' &&
                    updateQuestion.type !== 'paragraph'
                  "
                >
                  <div class="add-choose" v-for="(item, i) in updateQuestion.answers">
                    <div>
                      <span class="d-block mt-3 answer-index"> {{ i + 1 }} </span>
                    </div>
                    <div class="flex-fill">
                      <el-form-item
                        :prop="`answers[${i}]`"
                        :rules="[{ required: true, message: 'This field is required' }]"
                      >
                        <el-input
                          :placeholder="getPlaceholder(i)"
                          v-model="updateQuestion.answers[i]"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="d-block mt-4">
                      <el-radio
                        name="correct_answer"
                        v-model="updateQuestion.correct_answer"
                        :label="i"
                        >تحديد كإجابة صحيحة</el-radio
                      >
                    </div>
                  </div>
                </template>

                <template v-if="updateQuestion.type === 'choose_image'">
                  <div class="row">
                    <div class="col-md-6" v-for="(item, i) in updateQuestion.answers">
                      <div>
                        <div class="d-flex gap-3 mb-4">
                          <div>
                            <span class="d-block mt-3 answer-index"> {{ i + 1 }} </span>
                          </div>
                          <div class="d-block mt-4">
                            <el-radio
                              name="correct_answer"
                              v-model="updateQuestion.correct_answer"
                              :label="i"
                              >تحديد كإجابة صحيحة</el-radio
                            >
                          </div>
                        </div>
                        <div>
                          <AttachPhoto
                            @getPhoto="getAnswerPhoto(i, $event)"
                            title="صورة السؤال"
                            :image="updateQuestion.answers[i]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-if="updateQuestion.type === 'paragraph'">
                  <div>
                    <el-form-item
                      :prop="`correct_answer`"
                      :rules="[{ required: true, message: 'This field is required' }]"
                    >
                      <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="قم بكتابة الإجابة النموذجية"
                        v-model="updateQuestion.correct_answer"
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
  middleware: ["prevent-student"],
  components: {
    Button,
    AttachPhoto,
    QuestionAddedSuccessfully,
  },
  data() {
    return {
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

      updateQuestion: {
        lesson_id: "",
        type: "choose",
        level: "",
        answers: ["", "", "", ""],
        correct_answer: 0,
      },
    };
  },
  mounted() {
    this.getLessons();
    this.getQuestion();
  },
  methods: {
    getQuestionPhoto(e) {
      this.updateQuestion.image = e;
    },
    getAnswerPhoto(answerIndex, e) {
      this.updateQuestion.answers[answerIndex] = e;
    },
    async getQuestion() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/questions/${this.$route.params.id}`);
        this.updateQuestion = res.data;
        if (this.updateQuestion.type != "paragraph") {
          this.updateQuestion.correct_answer = +this.updateQuestion.correct_answer;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
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
    checkIfFile(input) {
      if ("File" in window && input instanceof File) return true;
      else return false;
    },
    async uploadAllImages(files) {
      const formData = new FormData();
      const order = [];

      for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i].img);
        order.push(files[i].type);
      }

      try {
        const res = await this.$axios.post("/upload", formData);
        return { files: res.data.files, order: order };
      } catch (err) {
        return [];
      }
    },
    submitUpdate() {
      // this.questionAddedPopup = true;
      this.$refs.updateQuestionRef.validate(async (valid) => {
        if (valid) {
          try {
            const files = [];
            if (this.checkIfFile(this.updateQuestion.image)) {
              files.push({
                img: this.updateQuestion.image,
                type: "main",
              });
            }
            // push the answers images if the type 'choose_image'
            if (this.updateQuestion.type === "choose_image") {
              let imagesError = false;
              this.updateQuestion.answers.forEach((ele, index) => {
                if (this.checkIfFile(ele)) {
                  files.push({
                    img: ele,
                    type: index,
                  });
                } else {
                  if (!ele) {
                    imagesError = true;
                    return;
                  }
                }
              });

              if (imagesError) {
                this.$notify.error({
                  title: "خطأ",
                  message: "جميع الصور الاجابات مطلوبة",
                });
                return;
              }
            }
            this.loading = true;
            if (files.length > 0) {
              let images = await this.uploadAllImages(files);

              const mainImgIndex = images?.order?.findIndex((ele) => ele == "main");
              if (mainImgIndex != -1) {
                this.updateQuestion.image = images.files[mainImgIndex];
              }
              [0, 1, 2, 3].forEach((ele) => {
                const answerIndex = images?.order?.findIndex((ele2) => ele2 == ele);
                if (answerIndex != -1) {
                  this.updateQuestion.answers[ele] = images.files[answerIndex];
                }
              });
            }
            await this.$axios.post(`/questions/${this.updateQuestion.id}`, {
              ...this.updateQuestion,
              _method: "put",
            });
            this.$router.push("/dashboard/questions-bank");
            this.$notify({
              title: "تم",
              message: "تم تعديل السؤال بنجاح",
              type: "success",
            });
          } catch (err) {
            this.loading = false;
            console.log(err);
            this.$notify.error({
              title: "خطأ",
              message: "حدث خطأ ما",
            });
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
