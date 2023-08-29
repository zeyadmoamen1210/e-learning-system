<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div v-loading="loading">
          <div class="mb-2 mt-2">
            <img src="@/assets/imgs/dashboard/profile-tick-linear-2.png" alt="" />
          </div>

          <h6 class="font mb-4 font-h5 mt-4 font--regular">تسليم الكود</h6>

          <span class="font font--semiBold mb-4 font-h6 d-block">
            هل أنت متأكد من تسليم هذا الكود
          </span>

          <span class="py-2 px-4 d-inline-block bg-light mb-4"> {{ code.code }} </span>

          <button
            @click="$emit('submit')"
            class="button button--primary mb-2 d-flex gap-3 justify-content-center m-auto py-3 font-h5 px-5 w-100"
          >
            تأكيد التسليم
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
    loading: {
      required: false,
      type: Boolean,
    },
    isOpened: {
      required: true,
      default: false,
      type: Boolean,
    },
    code: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
