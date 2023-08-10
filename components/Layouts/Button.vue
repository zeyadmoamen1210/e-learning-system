<template>
  <button
    class="app-button"
    :class="{
      'app-button__primary': type === 'primary',
      'app-button__primary-plain': type === 'primary-plain',
      'app-button__text-primary': type === 'text-primary',
      'app-button__text-danger': type === 'text-danger',
    }"
    :style="{ 'font-size': fontSize, padding: padding }"
  >
    <div class="d-flex gap-3 align-items-center">
      <slot></slot>
      <span>{{ text }}</span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      // 'primary', 'primary-plain', 'text-primary', 'text-danger'
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    fontSize: {
      default: "1.9rem",
      type: String,
    },
    padding: {
      default: "1.7rem 3rem",
      type: String,
    },
  },
};
</script>
