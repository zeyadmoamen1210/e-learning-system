<template>
  <div class="app-status">
    <span :class="type == 'enable' ? 'enable' : 'disable'" class="app-status__dot"></span>
    <span :class="type == 'enable' ? 'enable' : 'disable'" class="app-status__text">
      {{ type == "enable" ? "مُفعل" : "مُعطل" }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      // 'enable', 'disable'
      type: String,
    },
  },
};
</script>
