<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div>
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/vuesax-linear-tick-circle.svg" alt="" />
          </div>

          <h6 class="font mb-4 font-h5">أنتهي وقت الإمتحان</h6>

          <span class="font font--semiBold mb-5 font-h6 d-block">
            لقد تم تسليم الإمتحان لإنتهاء الوقت
          </span>

          <button
            @click="$emit('close', true)"
            class="button button--primary mb-4 d-flex gap-3 justify-content-center m-auto py-3 font-h5 px-5"
          >
            حسناً
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
    return {};
  },
  methods: {},
};
</script>
