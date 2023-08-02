<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> الإشتراك بالكورس </template>
      <template #body>
        <h6 class="font font--regular font--light mb-4 font-h5">
          تم تأكيد إشتراكك بالكورس بنجاح
        </h6>

        <div>
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/course-imgs/vuesax-broken-tick-circle.svg" alt="" />
          </div>

          <button
            @click="$emit('showCourseDetails', true)"
            class="button button--primary w-100 mb-4 d-flex gap-3 justify-content-center"
          >
            <span>عرض تفاصيل الكورس</span>
            <span>
              <img src="@/assets/imgs/course-imgs/vuesax-linear-arrow-left.svg" alt="" />
            </span>
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
    return {
      codeForm: {},
    };
  },
  methods: {},
};
</script>
