<template>
  <button
    class="app-button"
    :class="{
      'app-button__primary': type === 'primary',
      'app-button__success': type === 'success',
      'app-button__primary-plain': type === 'primary-plain',
      'app-button__danger-plain': type === 'danger-plain',
      'app-button__text-primary': type === 'text-primary',
      'app-button__text-danger': type === 'text-danger',
      'app-button__text-orange': type === 'text-orange',
      'app-button__success-plain': type === 'success-plain',
    }"
    :style="{ 'font-size': fontSize, padding: padding }"
  >
    <div
      class="d-flex gap-3 align-items-center"
      :class="center ? 'justify-content-center' : ''"
    >
      <slot></slot>
      <span :class="textClasses">{{ text }}</span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      // 'primary', 'primary-plain', 'text-primary', 'text-danger', 'success', 'danger-plain', 'success-plain', 'text-orange'
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
    center: {
      type: Boolean,
      default: false,
    },
    textClasses: {
      default: "",
      type: String,
    },
  },
};
</script>
