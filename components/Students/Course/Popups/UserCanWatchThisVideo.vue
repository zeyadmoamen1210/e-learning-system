<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div v-loading="loading">

          <div>
            <img style="width:90px" src="@/assets/imgs/video.svg" alt="">
          </div>
          <div>
            <h6 class="font font--bold mb-4 mt-3 font-h4"> تحذير عدد مرات المشاهدة </h6>
            <p class="font-h5 font--regular ">
              لقد شاهدت الفيديو <mark>{{videoResponse.userViewCount}} مرات</mark> يتبقي لك <mark>{{videoResponse.viewLimit}} مرة</mark> فقط لمشاهدة الفيديو في حالة التأكيد سيتم نقص مشاهدة من إجمالي مشاهداتك المسموحة
            </p>
          </div>

          <div class="mt-5 mb-2">
            <div class="row">
              <div class="col-md-6">
                <button @click="$emit('submit')" class="button button--primary w-100">
                  تأكيد
                </button>
              </div>
              <div class="col-md-6">
                <button @click="$emit('close')" class="button button--primary-plain w-100">
                  مشاهدة لاحقاً
                </button>
              </div>
            </div>
          </div>
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
    videoResponse: {
      required: true,
    },
    loading: {
      default: false
    },
    isOpened: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      openVideoLoading: false,
    };
  },
};
</script>
