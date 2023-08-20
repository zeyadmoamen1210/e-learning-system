<template>
  <div v-loading="loading">
    <div class="container">
      <div>
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

              <div class="col-md-3 col-lg-2">
                <div>
                  <el-form-item
                    prop="duration"
                    :rules="[
                      { required: true, message: 'هذا الحقل مطلوب' },
                      { type: 'number', message: 'يجب ان يكون رقم صحيح' },
                    ]"
                  >
                    <el-input
                      placeholder="مدة الكورس"
                      class="w-100"
                      v-model.number="editCourse.duration"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-3 col-lg-2">
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
                <el-form-item
                  prop="description"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    placeholder="تفاصيل الكورس"
                    type="textarea"
                    :rows="5"
                    v-model="editCourse.description"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item
                  prop="telegram"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
                  <el-input
                    placeholder="رابط جروب التليجرام"
                    v-model="editCourse.telegram"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item
                  prop="whatsapp"
                  :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
                >
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

      <CourseLessonsDetails @reloadCourse="getCourseDetails()" :course="editCourse" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AttachPhoto from "@/components/Layouts/AttachPhoto.vue";
import CourseLessonsDetails from "@/components/Dashboard/Course/LessonDetails.vue";

export default {
  components: {
    Button,
    AttachPhoto,
    CourseLessonsDetails,
  },
  data() {
    return {
      loading: false,
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
            this.$notify.error({
              title: " صورة الكورس مطلوبة",
              message: " قم بإرفاق صورة للكورس",
            });
            return;
          }
          this.loading = true;
          try {
            const formData = new FormData();
            formData.append("name", this.editCourse.name);
            formData.append("price", this.editCourse.price);
            formData.append("discount", this.editCourse.discount);
            formData.append("description", this.editCourse.description);
            formData.append("promo", this.editCourse.promo);
            formData.append("telegram", this.editCourse.telegram);
            formData.append("whatsapp", this.editCourse.whatsapp);
            // formData.append("image", this.editCourse.image);

            const res = await this.$axios.put(`/courses/${this.editCourse.id}`, formData);
            this.$notify({
              title: "تم بنجاح",
              message: "تم إضافة الفيديو بنجاح",
              type: "success",
            });
            this.$router.push(`/dashboard/courses/${res.data.id}`);
          } catch {
            this.$notify.error({
              title: " خطأ",
              message: " هناك خطأ ما",
            });
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
