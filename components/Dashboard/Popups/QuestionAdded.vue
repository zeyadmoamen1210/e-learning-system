<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div>
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/tick-circle-linear-success.png" alt="" />
          </div>

          <h6 class="font font--regular mb-4 font-h4">تم إضافة السؤال</h6>
          <span class="d-block font-h5 font--light"
            >تم إضافة السؤال في بنك الأسئلة بنجاح</span
          >
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
  methods: {},
};
</script>
