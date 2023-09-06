<template>
  <div v-loading="loading">
    <div class="d-flex gap-4 mb-3 flex-wrap justify-content-between align-items-center">
      <div>
        <h6 class="font-h4 font--regular">أكواد الإشتراك</h6>
        <p class="font--light font-h5">جميع أكواد الاشتراكات الخاصة بالكورسات</p>
      </div>
    </div>
    <div>
      <div class="d-flex gap-5 flex-wrap mb-5 mt-3">
        <div>
          <el-radio v-model="codeFilter" :label="0">الجديدة</el-radio>
        </div>
        <div>
          <el-radio v-model="codeFilter" :label="1">تم التسليم</el-radio>
        </div>
        <div>
          <el-radio v-model="codeFilter" :label="2">تم التفعيل</el-radio>
        </div>
      </div>
    </div>

    <div class="app-table-container">
      <table class="app-table" v-if="codes.length > 0">
        <thead>
          <th>
            <td> الكود </td>
          </th>

          <th v-if="codeFilter !== 0">
            <td> تاريخ التسليم </td>
          </th>

          <th v-if="codeFilter === 2">
            <td> يستخدم بواسطة </td>
          </th>


          <th v-if="codeFilter === 2">
            <td> تاريخ التفعيل </td>
          </th>

          <th>
            <td> الحالة</td>
          </th>


          <th v-if="codeFilter === 0">
            <td> نسخ </td>
          </th>

          <th v-if="codeFilter === 0">
            <td> تسليم الكود </td>
          </th>

        </thead>
        <tbody>
          <tr v-for="(code, index) in codes" :key="index">
            <td> {{ code.code }} </td>

            <td v-if="codeFilter !== 0"> {{ new Date(code.sold_at).toLocaleString() }} </td>
            <td v-if="codeFilter === 2"> {{ code.user?.name }} </td>
            <td v-if="codeFilter === 2">  {{ new Date(code.activated_at).toLocaleString() }} </td>

            <td>
              <span v-if="codeFilter == 0" class="text-plain-success font--h6 font--regular">جديد</span>
              <span v-if="codeFilter == 1" class="d-block font-h6 font--regular text-warning">تم التسليم</span>
              <span v-if="codeFilter == 2" class="d-block font-h6 font--regular text-danger">تم التفعيل</span>
            </td>

            <td v-if="codeFilter === 0">
              <Button
                @click.native="copyCode(code.code)"
                padding="0"
                type="text-primary"
                text="">
                <img src="@/assets/imgs/dashboard/document-copy-linear.svg" alt="">
              </Button>
            </td>
            <td v-if="codeFilter === 0">
              <div class="d-flex gap-5">
                <Button
                  @click.native="currCode = code, submitTheCodePopup = true"
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
      <NoData v-else text="لا يوجد أكواد" />
    </div>

      <div class="d-flex flex-row-reverse mt-4" v-if="total > 1">
        <el-pagination
          :current-page.sync="page"
          background
          layout="prev, pager, next"
          :total="total * 10"
          @current-change="getCourseCodes"
        >
        </el-pagination>
      </div>

      <SubmitSubscriptionCodePopup :loading="codeLoading" v-if="submitTheCodePopup" :code="currCode" @submit="submitSaleCode" :isOpened="submitTheCodePopup" @close="submitTheCodePopup = false" />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import SubmitSubscriptionCodePopup from '@/components/Dashboard/Popups/SubmitSubscriptionCodePopup.vue'
import NoData from '@/components/NoData.vue';

export default {
  layout: "dashboard",
  middleware: ['prevent-student'],
  components: {Button, SubmitSubscriptionCodePopup, NoData},
  data() {
    return {
      codeFilter: 0,
      submitTheCodePopup: false,
      codes: [],
      loading: false,
      page: 1,
      total: 1,
      currCode: {},
      codeLoading: false,
    };
  },
  watch: {
    codeFilter() {
      this.page = 1;
      this.getCourseCodes();
    }
  },
  mounted() {
    this.getCourseCodes();
  },
  methods: {
    async submitSaleCode() {
      this.codeLoading = true;
      try {
        const res = await this.$axios.post(`/courses-codes/${this.currCode.id}/sale`);
        this.submitTheCodePopup = false;
        this.getCourseCodes();
        this.$awn.success("تم تسليم هذا الكود بنجاح");

      } catch (err) {
        this.$awn.alert("هناك خطأ ما");
      } finally {
        this.codeLoading = false;
      }
    },
    copyCode(text) {
      navigator.clipboard.writeText(text);
      this.$awn.success('تم نسخ الكود بنجاح');
    },
    async getCourseCodes() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/courses/${this.$route.params.id}/codes`, {
          params: {
            status: this.codeFilter,
            page: this.page,
          }
        });
        this.codes = res.data.data;
        this.page = res.data.current_page;
        this.total = res.data.last_page;
      } catch (err){
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
