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
      'app-button__dark': type === 'dark',
      'app-button__dark-reverse': type === 'dark-reverse',
      'app-button__btn-orange': type === 'btn-orange',
      'app-button__orange-plain': type === 'orange-plain',
    }"
    :style="{ 'font-size': fontSize, padding: padding }"
  >
    <div
      class="d-flex gap-3 align-items-center"
      :class="center ? 'justify-content-center' : ''"
    >
      <slot></slot>
      <i v-if="isForShowAllCourses" class="el-icon-back"></i>
      <span class="app-button__text" :class="textClasses">
        <span>{{ text }}</span>
      </span>
      <i v-if="isForShowAllCourses" class="el-icon-right"></i>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      // 'primary', 'primary-plain', 'text-primary', 'text-danger', 'success', 'danger-plain', 'success-plain', 'text-orange', 'dark', 'dark-reverse', 'btn-orange'
      type: String,
    },
    isForShowAllCourses: {
      default: false,
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
