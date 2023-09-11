<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> تعديل المستخدم </template>
      <template #body>
        <div v-loading="loading">
          <h6 class="font font--light mb-4 font-h5">
            قم بتعديل بيانات المستخدم للمنصة
          </h6>

          <div class="mt-5">
            <el-form
              ref="updateUserPopup"
              class="mb-4"
              :model="updateUser"
              :rules="updateUserRules"
            >
              <el-form-item prop="name">
                <label for="name" class="text-end d-block font-h6"> الاسم </label>
                <el-input id="name" v-model="updateUser.name" placeholder="الاسم"></el-input>
              </el-form-item>

              <el-form-item prop="phone">
                <label for="phone" class="text-end d-block font-h6"> رقم الموبايل </label>
                <el-input
                  id="phone"
                  v-model="updateUser.phone"
                  placeholder="رقم الموبايل"
                ></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <label for="email" class="text-end d-block font-h6">
                  البريد الإلكترونى
                </label>
                <el-input
                  v-model="updateUser.email"
                  placeholder="البريد الإلكترونى"
                  id="email"
                ></el-input>
              </el-form-item>

              <el-form-item prop="role_id">
                <label for="role_id" class="text-end d-block font-h6"> الصلاحية </label>
                <el-select
                  style="width: 100%"
                  v-model="updateUser.role_id"
                  placeholder="الصلاحية"
                  id="role_id"
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

            <button @click="submitUpdateUser" class="button button--primary w-100 mb-4">
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
    user: {
      required: true
    }
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
      updateUserRules: {
        name: [{ required: true, message: "هذا الحقل مطلوب" }],
        email: [
          { type: "email", message: "يجب ان يكون بريد إلكتروني صالح" },
        ],
        password: [{ required: true, message: "هذا الحقل مطلوب" }, {
          min: 6,
          message: "كلمة المرور يجب ان تكون علي الأقل 6 حروف",
          trigger: "blur",
        }],
        passwordConfirm: [
          { required: true, message: "هذا الحقل مطلوب" },
          { validator: validateConfirmPass, trigger: "blur" },
          {
            min: 6,
            message: "كلمة المرور يجب ان تكون علي الأقل 6 حروف",
            trigger: "blur",
          }
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        role_id: [{ required: true, message: "هذا الحقل مطلوب" }],
      },
      codeForm: {},
      updateUser: this.user,
      roles: [
        { title: "أدمن", val: 1 },
        { title: "مُساعد", val: 2 },
        { title: "طالب", val: 3 },
      ],
    };
  },
  methods: {
    submitUpdateUser() {
      this.$refs.updateUserPopup.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await this.$axios.post("/users", {
              ...this.updateUser,
              user_id: this.updateUser.id
            });
            this.updateUser = {};
            this.$awn.success("تم تعديل المُستخدم بنجاح");
            this.$emit("done");
          } catch (err) {
            if (err.response.status === 422) {
              this.$awn.alert(err.response?.data?.message);
              return;
            }
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
