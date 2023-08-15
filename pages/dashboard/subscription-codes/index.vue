<template>
  <div>
    <div class="text-center mt-5" v-if="codes.length === 0">
      <div>
        <img src="@/assets/imgs/dashboard/tag-linear-222.svg" alt="" />
      </div>
      <h6 class="text-center font-h4 mt-3">أكواد الإشتراك</h6>
      <p class="font--light mb-4 mt-3">لا يوجد لديك أي أكواد اشتراك</p>
      <Button @click.native="addSubscriptionCodesPopup = true" type="success" text="إضافة أكواد جديدة" padding="1rem 2.5rem">
        <template>
          <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
        </template>
      </Button>
    </div>
    <div v-else>
      <div class="d-flex gap-2 mb-3 flex-wrap justify-content-between">
        <div>
          <h6 class="font-h4 font--regular">أكواد الإشتراك</h6>
          <p class="font--light font-h5">جميع أكواد الاشتراكات الخاصة بالكورسات</p>
        </div>
        <div class="d-flex gap-3 align-items-center flex-wrap">
          <Button
            @click.native="filterCodesPopup = true"
            padding="1.2rem 1.5rem"
            textClasses="font-h5 font--regular"
            type="primary"
            text="فلترة"
          >
            <template>
              <img src="@/assets/imgs/dashboard/candle-2-bulk.svg" alt="" />
            </template>
          </Button>
          <Button @click.native="addSubscriptionCodesPopup = true" type="success" text="إضافة أكواد جديدة" padding="1rem 2.5rem">
            <template>
              <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="" />
            </template>
          </Button>
        </div>
      </div>

      <div class="app-table-container">
        <table class="app-table">
          <thead>
            <th>
              <td> اسم الكورس </td>
            </th>
            <th>
              <td> عدد الأكواد </td>
            </th>
            <th>
              <td> تاريخ الإنشاء </td>
            </th>
            <th>
              <td> خيارات </td>
            </th>
          </thead>
          <tbody>
            <tr v-for="x in 15" :key="x">
              <td> مبادئ أساسيات الفيزياء </td>
              <td> 10</td>
              <td>
                18-06-2023
              </td>
              <td>
                <div class="d-flex gap-5">
                  <Button
                    @click.native="$router.push(`/dashboard/subscription-codes/1`)"
                    padding="0"
                    type="text-primary"
                    text="تفاصيل الأسئلة">
                    <img src="@/assets/imgs/dashboard/eye-linear.svg" alt="">
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <AddSubscriptionCodes :isOpened="addSubscriptionCodesPopup" @close="addSubscriptionCodesPopup = false" />
    <FilterSubscriptionCodes :isOpened="filterCodesPopup" @close="filterCodesPopup = false" />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AddSubscriptionCodes from "@/components/Dashboard/Popups/AddSubscriptionCodes.vue";
import FilterSubscriptionCodes from "@/components/Dashboard/Popups/FilterSubscriptionCodes.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    AddSubscriptionCodes,
    FilterSubscriptionCodes
  },
  data() {
    return {
      codes: [""],
      addSubscriptionCodesPopup: false,
      filterCodesPopup: false,
    };
  },
};
</script>
