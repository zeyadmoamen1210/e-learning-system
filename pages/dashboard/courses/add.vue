<template>
  <div v-loading="loading">
    <div class="container">
      <div>
        <div class="d-flex justify-content-between mb-3 align-items-center flex-wrap">
          <h6 class="font-h4 font--regular mb-0">إضافة كورس جديد</h6>
          <div>
            <Button
              type="success"
              text="إضافة"
              padding="1.2rem 1.5rem"
              textClasses="font-h5 font--regular"
              @click.native="addNewCourse"
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
          <el-form :model="addCourse" ref="addCourseRef">
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
                      v-model="addCourse.name"
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
                      v-model.number="addCourse.price"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-6 col-lg-2">
                <div>
                  <h6 class="font-h6">هل هناك خصم على الكورس ؟</h6>
                  <div class="d-flex gap-2 justify-content-start mt-2">
                    <el-radio class="m-0" v-model="addCourse.ifHasDiscount" :label="true"
                      >نعم
                    </el-radio>
                    <el-radio class="m-0" v-model="addCourse.ifHasDiscount" :label="false"
                      >لا
                    </el-radio>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-2">
                <div v-if="addCourse.ifHasDiscount">
                  <el-form-item
                    prop="discount"
                    :rules="[
                      { required: true, message: 'هذا الحقل مطلوب' },
                      { type: 'number', message: 'يجب ان يكون رقم صحيح' },
                    ]"
                  >
                    <el-input
                      placeholder="نسبة الخصم %"
                      class="w-100"
                      v-model.number="addCourse.discount"
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
                    v-model="addCourse.description"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item prop="telegram">
                  <el-input
                    placeholder="رابط جروب التليجرام"
                    v-model="addCourse.telegram"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-6">
                <el-form-item prop="whatsapp">
                  <el-input
                    placeholder="رابط جروب الواتساب"
                    v-model="addCourse.whatsapp"
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
                    v-model="addCourse.promo"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-md-12">
                <h6 class="font-h6 text-primary font-regular mb-4">صورة الكورس</h6>
              </div>
              <div>
                <AttachPhoto title="صورة الكورس" @getPhoto="getCoursePhoto" />
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AttachPhoto from "@/components/Layouts/AttachPhoto.vue";
export default {
  components: {
    Button,
    AttachPhoto,
  },
  middleware: ["prevent-student"],
  data() {
    return {
      loading: false,
      addCourse: {
        ifHasDiscount: false,
      },
    };
  },
  methods: {
    getCoursePhoto(e) {
      this.addCourse.image = e;
    },
    addNewCourse() {
      this.$refs.addCourseRef.validate(async (valid) => {
        if (valid) {
          if (!this.addCourse.image) {
            this.$awn.alert(" قم بإرفاق صورة للكورس صورة الكورس مطلوبة");
            return;
          }
          this.loading = true;
          try {
            if (!this.addCourse.ifHasDiscount) {
              this.addCourse.discount = 0;
            }

            const formData = new FormData();
            formData.append("name", this.addCourse.name);
            formData.append("price", this.addCourse.price);
            formData.append("discount", this.addCourse.discount);
            if (this.addCourse.description) {
              formData.append("description", this.addCourse.description);
            }
            if (this.addCourse.telegram) {
              formData.append("telegram", this.addCourse.telegram);
            }
            if (this.addCourse.whatsapp) {
              formData.append("whatsapp", this.addCourse.whatsapp);
            }
            formData.append("promo", this.addCourse.promo);
            formData.append("image", this.addCourse.image);

            const res = await this.$axios.post(`/courses`, formData);
            this.$awn.success("تم إضافة الفيديو بنجاح");

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
