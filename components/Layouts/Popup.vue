<template>
  <div class="app-popup" v-if="open">
    <div class="app-popup__outer" :style="{ 'max-width': maxWidth }">
      <div class="app-popup__header">
        <button @click="$emit('close', false)" class="app-popup__close">
          <img src="@/assets/imgs/close.svg" alt="" />
        </button>
        <h6 class="font-h4 font--regular">
          <slot name="header" />
        </h6>
      </div>
      <div
        class="app-popup__content"
        :class="contentCentered ? 'app-popup__content-centered' : ''"
      >
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      required: true,
      default: false,
      type: Boolean,
    },
    contentCentered: {
      required: true,
      default: false,
    },
    maxWidth: {
      required: false,
      default: "70rem",
      //120rem
    },
  },
};
</script>
