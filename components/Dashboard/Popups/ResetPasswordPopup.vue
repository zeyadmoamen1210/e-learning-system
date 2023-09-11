<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/vuesax-linear-tick-circle.svg" alt="" />
          </div>

          <h6 class="font mb-4 font-h5">إعادة تعيين كلمة المرور</h6>

          <span class="font font--semiBold mb-5 font-h6 d-block">
            سوف يتم تغيير كلمة المرور لهذا الحساب ليكون من 1 إلي 6
          </span>

          <button
            @click="$emit('submit', true)"
            class="button button--primary mb-4 d-flex gap-3 justify-content-center m-auto py-3 font-h5 px-5"
          >
            تأكيد
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
    loading: {
      required: false,
    },
  },
  data() {
    return {
      codeForm: {},
    };
  },
  methods: {},
};
</script>
