<template>
  <div>
    <div class="mb-5">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div class="d-flex gap-3 flex-wrap">
          <Button
            @click.native="activeTab = 'students'"
            :type="activeTab === 'students' ? 'primary' : 'primary-plain'"
            text="الطلاب"
          ></Button>

          <Button
            @click.native="activeTab = 'users'"
            :type="activeTab === 'users' ? 'primary' : 'primary-plain'"
            text="مستخدمين المنصة"
          ></Button>
        </div>
        <div>
          <Button
            type="success"
            text="إضافة مستخدم جديد"
            @click.native="addUserPopup = true"
          >
            <template>
              <img src="@/assets/imgs/dashboard/add-circle-bulk.svg" alt="">
            </template>
          </Button>
        </div>
      </div>
    </div>

    <div class="app-table-container">
      <table class="app-table">
        <thead>
          <th>
            <td> الاسم </td>
          </th>
          <th>
            <td> البريد الإلكتروني </td>
          </th>
          <th>
            <td> حالة الحساب </td>
          </th>
          <th>
            <td> خيارات </td>
          </th>
        </thead>
        <tbody>
          <tr v-for="x in 15" :key="x">
            <td>احمد محمود</td>
            <td>zeyadmoamen7@gmail.com</td>
            <td>
              <Status type="disable" />
            </td>
            <td>
              <div class="d-flex gap-5">
                <Button
                  @click.native="enableUserPopup = true"
                  padding="0"
                  type="text-primary"
                  text="تفعيل الحساب">
                  <img src="@/assets/imgs/dashboard/tick-circle-linear.svg" alt="">
                </Button>

                <Button
                  @click.native="disableUserPopup = true"
                  padding="0"
                  type="text-danger"
                  text="تعطيل الحساب">
                  <img src="@/assets/imgs/dashboard/close-circle-linear.svg" alt="">
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <EnableUserPopup @close="enableUserPopup = false" :isOpened="enableUserPopup" />
    <DisableUserPopup @close="disableUserPopup = false" :isOpened="disableUserPopup" />
    <AddUserPopup @close="addUserPopup = false" :isOpened="addUserPopup" />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import Status from "@/components/Layouts/Status.vue";
import EnableUserPopup from '@/components/Dashboard/Popups/EnableUser';
import DisableUserPopup from '@/components/Dashboard/Popups/DisableUser';
import AddUserPopup from '@/components/Dashboard/Popups/AddUser';

export default {
  components: {
    Button,
    Status,
    EnableUserPopup,
    DisableUserPopup,
    AddUserPopup
  },
  layout: "dashboard",
  data() {
    return {
      activeTab: "students",
      enableUserPopup: false,
      disableUserPopup: false,
      addUserPopup: false,
    };
  },
};
</script>
