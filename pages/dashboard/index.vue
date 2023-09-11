<template>
  <div v-loading.fullscreen="loading">
    <div v-show="!loading">
    <div class="mb-5">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div class="d-flex gap-3 flex-wrap">
          <Button
            @click.native="filter.is_student = 1, getUsers()"
            :type="filter.is_student == 1 ? 'primary' : 'primary-plain'"
            text="الطلاب"
          ></Button>

          <Button
            @click.native="filter.is_student = 0, getUsers()"
            :type="filter.is_student == 0 ? 'primary' : 'primary-plain'"
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
    <div class="d-flex gap-2 mb-3 flex-wrap flex-md-nowrap">
      <div>
        <el-input @change="getUsers()" v-model="filter.name" placeholder="الاسم"></el-input>
      </div>
      <div>
        <el-input @change="getUsers()" v-model="filter.email" placeholder="البريد الإلكتروني"></el-input>
      </div>
      <div>
        <el-input @change="getUsers()" v-model="filter.phone" placeholder="رقم الهاتف"></el-input>
      </div>
      <div>
        <el-select clearable @change="getUsers()" v-model="filter.active" placeholder="حالة الحساب">
          <el-option :value="1" label="مُفعل"></el-option>
          <el-option :value="0" label="مُعطل"></el-option>
        </el-select>
      </div>
    </div>
    <div class="app-table-container" v-if="users.length > 0">
      <table class="app-table">
        <thead>
          <th>
            <td> الاسم </td>
          </th>
          <th>
            <td> البريد الإلكتروني </td>
          </th>
          <th>
            <td>  رقم الموبايل </td>
          </th>
          <th>
            <td> حالة الحساب </td>
          </th>
          <th>
            <td> خيارات </td>
          </th>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td> {{ user.name }} </td>
            <td> {{ user.email }} </td>
            <td> {{ user.phone }} </td>
            <td>
              <Status :type="user.active == 1 ? 'enable' : 'disable'" />
            </td>
            <td>
              <div class="d-flex gap-5">

                <el-dropdown>
                  <span class="el-dropdown-link">
                    إعداد الحساب <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="user.active == 0">
                      <Button
                        @click.native="currUser = {...user}, enableUserPopup = true"
                        padding="0"
                        type="text-primary"
                        text="تفعيل الحساب">
                      </Button>
                    </el-dropdown-item>
                    <el-dropdown-item v-if="user.active == 1">
                      <Button
                        @click.native="currUser = {...user}, disableUserPopup = true"
                        padding="0"
                        type="text-danger"
                        textClasses="font-h6"
                        text="تعطيل الحساب">
                      </Button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <Button
                        @click.native="currUser = {...user}, resetPasswordPopup = true"
                        padding="0"
                        textClasses="font-h6"
                        type="text-orange"
                        text=" إعادة تعيين كلمة المرور">
                      </Button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <Button
                        @click.native="currUser = {...user}, updateUserPopup = true"
                        padding="0"
                        textClasses="font-h6"
                        type="text-success"
                        text="تعديل ">
                      </Button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>




              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex flex-row-reverse mt-4" v-if="total > 1">
        <el-pagination
          :current-page.sync="page"
          background
          layout="prev, pager, next"
          :total="total * 10"
          @current-change="getUsers(true)"
        >
        </el-pagination>
      </div>

    </div>
    <NoData v-else text="لا يوجد مُستخدمين" />

    <EnableUserPopup :loading="popupLoading" @enable="updateUserStatus(true)" @close="enableUserPopup = false" :isOpened="enableUserPopup" />
    <DisableUserPopup :loading="popupLoading" @disable="updateUserStatus(false)" @close="disableUserPopup = false" :isOpened="disableUserPopup" />

    <AddUserPopup  @done="addUserPopup = false,getUsers()" @close="addUserPopup = false" :isOpened="addUserPopup" />
    <UpdateUserPopup v-if="updateUserPopup" :user="currUser" @done="updateUserPopup = false,getUsers()" @close="updateUserPopup = false" :isOpened="updateUserPopup" />

    <ResetPasswordPopup :loading="popupLoading" @submit="resetPassword" @close="resetPasswordPopup = false" :isOpened="resetPasswordPopup" />


  </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import Status from "@/components/Layouts/Status.vue";
import EnableUserPopup from '@/components/Dashboard/Popups/EnableUser';
import DisableUserPopup from '@/components/Dashboard/Popups/DisableUser';
import AddUserPopup from '@/components/Dashboard/Popups/AddUser';
import UpdateUserPopup from '@/components/Dashboard/Popups/UpdateUser';

import NoData from "~/components/NoData.vue";
import ResetPasswordPopup from '@/components/Dashboard/Popups/ResetPasswordPopup.vue';
export default {
  middleware: ['prevent-student'],
  components: {
    UpdateUserPopup,
    Button,
    Status,
    EnableUserPopup,
    DisableUserPopup,
    AddUserPopup,
    NoData,
    ResetPasswordPopup,
},
  layout: "dashboard",
  mounted() {
    this.getUsers();
  },
  methods: {
    async resetPassword() {
      this.popupLoading= true;
      try {
        await this.$axios.post(`/reset-password`, {
          user_id: this.currUser.id,
        });
        this.resetPasswordPopup = false;
        this.$awn.success("تم تعديل كلمة المرور بنجاح");

        this.getUsers();
      } catch(err) {
        this.$awn.alert(" هناك خطأ ما");

      } finally {
        this.popupLoading= false;
      }
    },
    async updateUserStatus(enable) {
      this.popupLoading= true;
      try {
        await this.$axios.post(`/profile-status`, {
          user_id: this.currUser.id,
          active: enable ? 1 : 0,
        });
        enable ? this.enableUserPopup = false : this.disableUserPopup = false;
        this.$awn.success("تم تعديل حالة المُستخدم بنجاح");

        this.getUsers();
      } catch(err) {
        this.$awn.alert(" هناك خطأ ما");

      } finally {
        this.popupLoading= false;
      }
    },
    async getUsers(paginate) {
      if(!paginate) {
        this.page = 1;
      }
      this.loading = true;
      try {
        const req = {};
        this.filter.name ? req.name = this.filter.name : null;
        this.filter.email ? req.email = this.filter.email : null;
        this.filter.phone ? req.phone = this.filter.phone : null;
        this.filter.active ? req.active = this.filter.active : null;

        const res = await this.$axios.get('/users', {params: {
          ...req,
          is_student: this.filter.is_student,
          page: this.page,
        }})
        this.users = res.data.data;
        this.page = res.data.current_page;
        this.total = res.data.last_page;

      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  },
  data() {
    return {
      users: [],
      page: 1,
      total: 1,
      currUser: {},
      popupLoading: false,
      enableUserPopup: false,
      disableUserPopup: false,
      addUserPopup: false,
      updateUserPopup: false,
      loading: true,
      resetPasswordPopup: false,
      filter: {
        name: null,
        email: null,
        phone: null,
        active: null,
        is_student: 1
      }
    };
  },
};
</script>
