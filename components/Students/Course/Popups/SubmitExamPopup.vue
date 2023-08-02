<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> تأكيد تسليم الاختبار </template>
      <template #body>
        <h6 class="font font--regular font--light mb-4 font-h5">
          هل أنت متأكد من تسليم الاختبار ؟
        </h6>

        <div class="mt-5 mb-2">
          <button class="button button--primary w-100">تأكيد التسليم</button>
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
    return {
      codeForm: {},
    };
  },
};
</script>
