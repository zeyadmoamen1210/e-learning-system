<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> إضافة مستخدم جديد </template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--light mb-4 font-h5">
            قم بإضافة بيانات مستخدم جديد للمنصة
          </h6>

          <div class="mt-5">
            <el-form
              ref="addUserPopup"
              class="mb-4"
              :model="addUser"
              :rules="addUserRules"
            >
              <el-form-item prop="name">
                <el-input v-model="addUser.name" placeholder="الاسم"></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input
                  v-model="addUser.email"
                  placeholder="البريد الإلكترونى"
                ></el-input>
              </el-form-item>

              <el-form-item prop="phone">
                <el-input v-model="addUser.phone" placeholder="رقم الموبايل"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="addUser.password"
                  placeholder="كلمة المرور"
                ></el-input>
              </el-form-item>

              <el-form-item prop="passwordConfirm">
                <el-input
                  v-model="addUser.passwordConfirm"
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                ></el-input>
              </el-form-item>

              <el-form-item prop="role_id">
                <el-select
                  style="width: 100%"
                  v-model="addUser.role_id"
                  placeholder="الصلاحية"
                >
                  <el-option
                    v-for="role in roles"
                    :key="role.val"
                    :label="role.title"
                    :value="role.val"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <button @click="submitAddUser" class="button button--primary w-100 mb-4">
              إنشاء
            </button>
          </div>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import Popup from "@/components/Layouts/Popup.vue";
export default {
  components: {
    Popup,
  },
  props: {
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        return callback(new Error("هذا الحقل مطلوب"));
      } else {
        const regex = /^01[0125][0-9]{8}$/;
        console.log(value);
        if (!value.match(regex)) {
          return callback(new Error("رقم الموبايل غير صالح يجب ان يكون رقم موبايل مصري"));
        }
      }
      callback();
    };

    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("هذا الحقل مطلوب"));
      } else if (value !== this.addUser.password) {
        callback(new Error("كلمة المرور غير متطابقة!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      addUserRules: {
        name: [{ required: true, message: "هذا الحقل مطلوب" }],
        email: [
          { required: true, message: "هذا الحقل مطلوب" },
          { type: "email", message: "يجب ان يكون بريد إلكتروني صالح" },
        ],
        password: [{ required: true, message: "هذا الحقل مطلوب" }],
        passwordConfirm: [
          { required: true, message: "هذا الحقل مطلوب" },
          { validator: validateConfirmPass, trigger: "blur" },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        role_id: [{ required: true, message: "هذا الحقل مطلوب" }],
      },
      codeForm: {},
      addUser: {},
      roles: [
        { title: "أدمن", val: 1 },
        { title: "مُساعد", val: 2 },
        { title: "طالب", val: 3 },
      ],
    };
  },
  methods: {
    submitAddUser() {
      this.$refs.addUserPopup.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await this.$axios.post("/auth/register", {
              ...this.addUser,
            });
            this.addUser = {};
            this.$notify({
              title: "تم بنجاح",
              message: "تم إضافة المُستخدم بنجاح",
              type: "success",
            });
            this.$emit("done");
          } catch (err) {
            if (err.response.status === 422) {
              this.$notify.error({
                title: " خطأ",
                message: err.response?.data?.message,
              });
              return;
            }
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
