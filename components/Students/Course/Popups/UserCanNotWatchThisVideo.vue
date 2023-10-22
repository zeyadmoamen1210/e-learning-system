<template>
  <div>
    <Popup :contentCentered="true" :open="isOpened" @close="$emit('close', false)">
      <template #header> </template>
      <template #body>
        <div v-loading="openVideoLoading">
          <div>
            <img style="width:90px" src="@/assets/imgs/video-forbidden.svg" alt="">
          </div>
          <div>
            <h6 class="font font--bold mb-4 mt-3 font-h4"> لقد انتهت عدد مرات المشاهدة المسموحة لك </h6>
            <p class="font-h5 font--regular ">
              لقد استهلكت جميع مرات المشاهدة المسموحة لهذا الفيديو و هي <mark>{{videoResponse.viewLimit}} مرات</mark> مشاهدة
            </p>
<!--            <p class="font-h5 font&#45;&#45;regular ">-->
<!--              لقد شاهدت الفيديو {{videoResponse.userViewCount}} مرات يتبقي لك {{videoResponse.viewLimit}} مرة فقط لمشاهدة الفيديو-->
<!--            </p>-->
          </div>

          <div class="mt-5 mb-2">
            <button @click="$emit('submit')" class="button button--primary w-100">
              تأكيد
            </button>
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
