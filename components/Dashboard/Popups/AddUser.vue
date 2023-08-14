<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> إضافة مستخدم جديد </template>
      <template #body>
        <h6 class="font font--light mb-4 font-h5">قم بإضافة بيانات مستخدم جديد للمنصة</h6>

        <div class="mt-5">
          <el-form ref="addUserPopup" class="mb-4" :model="addUser">
            <el-form-item
              prop="name"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input v-model="addUser.code" placeholder="الاسم"></el-input>
            </el-form-item>

            <el-form-item
              prop="email"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                v-model="addUser.email"
                placeholder="البريد الإلكترونى"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="password"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input v-model="addUser.password" placeholder="كلمة المرور"></el-input>
            </el-form-item>

            <el-form-item
              prop="passwordConfirm"
              :rules="[{ required: true, message: 'هذا الحقل مطلوب' }]"
            >
              <el-input
                v-model="addUser.passwordConfirm"
                placeholder="تأكيد كلمة المرور"
              ></el-input>
            </el-form-item>
          </el-form>

          <button @click="submitAddUser" class="button button--primary w-100 mb-4">
            إنشاء
          </button>
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
    return {
      codeForm: {},
      addUser: {},
    };
  },
  methods: {
    submitAddUser() {
      this.$refs.addUserPopup.validate((valid) => {
        if (valid) {
        }
      });
    },
  },
};
</script>
