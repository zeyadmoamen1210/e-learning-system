import Vue from "vue"
import VueAWN from "vue-awesome-notifications"

// // Your custom options
let options = {
  position: 'top-right',
  icons: {
    prefix: '',
    suffix: '',
    enabled: true,
    success: "<i style='font-size: 45px;color: #00800099;' class='el-icon-success'></i>",
    alert: "<i style='font-size: 45px;color: #ff0000b3;' class='el-icon-error'></i>",
    info: "<i style='font-size: 45px;color: #008dd2b5;' class='el-icon-warning-outline'></i>",
  },
  labels: {
    success: 'تم بنجاح',
    alert: 'خطأ',
  },
  durations: {
    alert: 2000,
    success: 2000,
    info: 2000,
  }
}
Vue.use(VueAWN, options)
