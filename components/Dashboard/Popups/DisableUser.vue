<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/vuesax-linear-close-circle.svg" alt="" />
          </div>

          <h6 class="font mb-4 font-h5">تعطيل الحساب</h6>

          <span class="font font--semiBold mb-5 font-h6 d-block">
            هل أنت متأكد من تعطيل الحساب ؟
          </span>

          <button
            @click="$emit('disable', true)"
            class="button button--danger mb-4 d-flex gap-3 justify-content-center m-auto py-3 font-h5 px-5"
          >
            تأكيد التعطيل
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
