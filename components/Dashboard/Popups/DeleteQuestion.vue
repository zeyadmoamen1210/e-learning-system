<template>
  <div>
    <Popup
      v-loading="loading"
      :contentCentered="true"
      :open="isOpened"
      @close="$emit('close', false)"
    >
      <template #header> </template>
      <template #body>
        <div>
          <div class="mb-4 mt-2">
            <img src="@/assets/imgs/dashboard/trash-bulk.svg" alt="" />
          </div>

          <h6 class="font mb-3 font-h5">{{ mytitle }}</h6>

          <span class="font font--semiBold mb-5 font-h6 d-block">
            {{ mytext }}
          </span>

          <button @click="$emit('delete', true)" class="button button--danger mb-4 w-100">
            حذف
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
    mytitle: {
      required: true,
    },
    mytext: {
      required: true,
    },
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
    return {};
  },
  methods: {},
};
</script>
