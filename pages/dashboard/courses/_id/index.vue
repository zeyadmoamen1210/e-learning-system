<template>
  <div v-loading.fullscreen="loading">
    <div v-show="!loading" class="container">
      <div class="d-flex gap-2 mb-4">
        <Button
          padding="1.4rem 2rem"
          :type="currTab === 1 ? 'primary' : 'primary-plain'"
          @click.native="currTab = 1"
          :center="true"
          text="تفاصيل الكورس"
          text-classes="font-h5 font--regular"
        ></Button>
        <Button
          padding="1.4rem 2rem"
          :type="currTab === 2 ? 'primary' : 'primary-plain'"
          @click.native="currTab = 2"
          :center="true"
          text="محتوي الكورس"
          text-classes="font-h5 font--regular"
        ></Button>
      </div>

      <div v-if="currTab == 1">
        <div class="d-flex justify-content-between mb-3 align-items-center flex-wrap">
          <h6 class="font-h4 font--regular mb-0">تعديل الكورس</h6>
          <div>
            <Button
              type="success"
              text="تعديل"
              padding="1.2rem 1.5rem"
              textClasses="font-h5 font--regular"
              @click.native="submitEditCourse"
            >
              <template>
                <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
              </template>
            </Button>
          </div>
        </div>
        <div>
          <h6 class="font-h6 text-primary font-regular mb-4">البيانات الأساسية للكورس</h6>
        </div>
        <div>
          <el-form :model="editCourse" ref="editCourseRef">
            <div class="row">
              <div class="col-md-6 col-lg-4">
                <div>
                  <el-form-item
                    prop="name"
                    :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                  >
                    <el-input
                      placeholder="عنوان الكورس"
                      class="w-100"
                      v-model="editCourse.name"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 col-lg-4">
                <div>
                  <el-form-item
                    prop="price"
                    :rules="[
                      { required: true, message: 'هذا الحقل مطلوب' },
                      { type: 'number', message: 'يجب ان يكون رقم صحيح' },
                    ]"
                  >
                    <el-input
                      placeholder="سعر الكورس"
                      class="w-100"
                      v-model.number="editCourse.price"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-6 col-lg-2">
                <div>
                  <h6 class="font-h6">هل هناك خصم على الكورس ؟</h6>
                  <div class="d-flex gap-2 justify-content-start mt-2">
                    <el-radio class="m-0" v-model="editCourse.ifHasDiscount" :label="true"
                      >نعم
                    </el-radio>
                    <el-radio
                      class="m-0"
                      v-model="editCourse.ifHasDiscount"
                      :label="false"
                      >لا
                    </el-radio>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-2">
                <div v-if="editCourse.ifHasDiscount">
                  <el-form-item
                    prop="discount"
                    :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                  >
                    <el-input
                      placeholder="نسبة الخصم %"
                      class="w-100"
                      v-model="editCourse.discount"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-12">
                <el-form-item prop="description">
                  <el-input
                    placeholder="تفاصيل الكورس"
                    type="textarea"
                    :rows="5"
                    v-model="editCourse.description"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item prop="telegram">
                  <el-input
                    placeholder="رابط جروب التليجرام"
                    v-model="editCourse.telegram"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item prop="whatsapp">
                  <el-input
                    placeholder="رابط جروب الواتساب"
                    v-model="editCourse.whatsapp"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-12">
                <h6 class="font-h6 text-primary font-regular mb-4">
                  بيانات الفيديو التعريفي للكورس
                </h6>
              </div>
              <div class="col-md-6">
                <el-form-item
                  prop="promo"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    placeholder="رابط الفيديو التعريفي"
                    v-model="editCourse.promo"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-12">
                <h6 class="font-h6 text-primary font-regular mb-4">صورة الكورس</h6>
              </div>
              <div>
                <AttachPhoto
                  title="صورة الكورس"
                  @getPhoto="getCoursePhoto"
                  :image="editCourse.image"
                />
              </div>
            </div>
          </el-form>
        </div>
      </div>

      <div v-if="currTab == 2">
        <CourseLessonsDetails @reloadCourse="getCourseDetails()" :course="editCourse" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AttachPhoto from "@/components/Layouts/AttachPhoto.vue";
import CourseLessonsDetails from "@/components/Dashboard/Course/LessonDetails.vue";

export default {
  middleware: ["prevent-student"],
  components: {
    Button,
    AttachPhoto,
    CourseLessonsDetails,
  },
  data() {
    return {
      loading: true,
      currTab: 1,
      editCourse: {
        ifHasDiscount: true,
      },
    };
  },
  mounted() {
    this.getCourseDetails();
  },
  methods: {
    async getCourseDetails() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/admin/courses/${this.$route.params.id}`);
        this.editCourse = { ...this.editCourse, ...res.data };
        if (+this.editCourse.discount > 0) {
          this.editCourse.ifHasDiscount = true;
        } else {
          this.editCourse.ifHasDiscount = false;
        }
      } finally {
        this.loading = false;
      }
    },
    getCoursePhoto(e) {
      this.editCourse.image = e;
    },
    submitEditCourse() {
      this.$refs.editCourseRef.validate(async (valid) => {
        if (valid) {
          if (!this.editCourse.image) {
            this.$awn.alert(" قم بإرفاق صورة للكورس صورة الكورس مطلوبة");

            return;
          }
          this.loading = true;
          try {
            if (!this.editCourse.ifHasDiscount) {
              this.editCourse.discount = 0;
            }
            const formData = new FormData();
            formData.append("name", this.editCourse.name);
            formData.append("price", this.editCourse.price);
            formData.append("discount", this.editCourse.discount);
            formData.append("year", 3);

            if (this.editCourse.description) {
              formData.append("description", this.editCourse.description);
            }
            if (this.editCourse.telegram) {
              formData.append("telegram", this.editCourse.telegram);
            }
            if (this.editCourse.whatsapp) {
              formData.append("whatsapp", this.editCourse.whatsapp);
            }

            formData.append("promo", this.editCourse.promo);
            formData.append("_method", "put");
            if (typeof this.editCourse.image !== "string") {
              formData.append("image", this.editCourse.image);
            }

            const res = await this.$axios.post(
              `/courses/${this.editCourse.id}`,
              formData
            );
            this.$awn.success("تم تعديل الكورس بنجاح");
            this.$router.push(`/dashboard/courses/${res.data.id}`);
          } catch {
            this.$awn.alert(" هناك خطأ ما");
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
