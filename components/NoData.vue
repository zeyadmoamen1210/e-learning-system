<template>
  <div class="no-data-container">
    <img src="@/assets/imgs/no-data.svg" alt="" />
    <h6 class="text-center mb-3 font-h6">{{ text }}</h6>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="scss">
.no-data-container {
  width: 300px;
  margin: auto;
  img {
    width: 100%;
  }
}
</style>
