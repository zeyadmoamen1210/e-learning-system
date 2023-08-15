<template>
  <div>
    <div class="d-flex gap-4 mb-3 flex-wrap justify-content-between align-items-center">
      <div>
        <h6 class="font-h4 font--regular">أكواد الإشتراك</h6>
        <p class="font--light font-h5">جميع أكواد الاشتراكات الخاصة بالكورسات</p>
      </div>
      <div class="d-flex gap-5 flex-wrap">
        <div>
          <span class="d-block font-h6 font--light mb-2">اسم الطالب</span>
          <h6 class="font-h5 font--regular">أحمد محمود سليم</h6>
        </div>
        <div>
          <span class="d-block font-h6 font--light mb-2">عدد الأكواد</span>
          <h6 class="font-h5 font--regular">10</h6>
        </div>
        <div>
          <span class="d-block font-h6 font--light mb-2">تاريخ الإنشاء</span>
          <h6 class="font-h5 font--regular">18-06-2023</h6>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex gap-5 flex-wrap mb-5 mt-3">
        <div>
          <el-radio v-model="codeFilter" label="1">الجديدة</el-radio>
        </div>
        <div>
          <el-radio v-model="codeFilter" label="2">تم التسليم</el-radio>
        </div>
        <div>
          <el-radio v-model="codeFilter" label="3">تم التفعيل</el-radio>
        </div>
      </div>
    </div>

    <div class="app-table-container">
        <table class="app-table">
          <thead>
            <th>
              <td> الكود </td>
            </th>

            <th v-if="codeFilter !== '1'">
              <td> تاريخ التسليم </td>
            </th>

            <th v-if="codeFilter === '3'">
              <td> يستخدم بواسطة </td>
            </th>


            <th v-if="codeFilter === '3'">
              <td> تاريخ التفعيل </td>
            </th>

            <th>
              <td> الحالة</td>
            </th>


            <th v-if="codeFilter === '1'">
              <td> نسخ </td>
            </th>

            <th v-if="codeFilter === '1'">
              <td> تسليم الكود </td>
            </th>

          </thead>
          <tbody>
            <tr v-for="x in 15" :key="x">
              <td> ewas0125084 </td>

              <td v-if="codeFilter !== '1'"> 17-07-2023 </td>
              <td v-if="codeFilter === '3'"> أحمد محمد موسى </td>
              <td v-if="codeFilter === '3'">  17-07-2023 </td>

              <td>
                <span v-if="codeFilter == '1'" class="text-plain-success font--h6 font--regular">جديد</span>
                <span v-if="codeFilter == '2'" class="d-block font-h6 font--regular text-warning">تم التسليم</span>
                <span v-if="codeFilter == '3'" class="d-block font-h6 font--regular text-danger">تم التفعيل</span>
              </td>

              <td v-if="codeFilter === '1'">
                <Button
                  padding="0"
                  type="text-primary"
                  text="">
                  <img src="@/assets/imgs/dashboard/document-copy-linear.svg" alt="">
                </Button>
              </td>
              <td v-if="codeFilter === '1'">
                <div class="d-flex gap-5">
                  <Button
                    @click.native="submitTheCodePopup = true"
                    padding="0"
                    type="text-orange"
                    text="تسليم ">
                    <img src="@/assets/imgs/dashboard/profile-tick-linear.svg" alt="">
                  </Button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      <SubmitSubscriptionCodePopup :isOpened="submitTheCodePopup" @close="submitTheCodePopup = false" />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import SubmitSubscriptionCodePopup from '@/components/Dashboard/Popups/SubmitSubscriptionCodePopup.vue'

export default {
  layout: "dashboard",
  components: {Button, SubmitSubscriptionCodePopup},
  data() {
    return {
      codeFilter: "1",
      submitTheCodePopup: false,
    };
  },
};
</script>
