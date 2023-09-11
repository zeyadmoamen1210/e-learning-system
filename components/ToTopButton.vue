<template>
  <div class="top-top">
    <button @click="toTop()" v-if="isVisible">
      <font-awesome-icon :icon="['fas', 'chevron-up']" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.isVisible = window.scrollY > 50
    },
    toTop () {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        }
      )
    },
  }
}
</script>

<style scoped lang="scss">
.top-top {
  position: fixed;
  bottom: 15px;
  right: 15px;
  button {
    width: 53px;
    height: 39px;
    line-height: 43px;
    font-size: 26px;
    border: none;
    text-align: center;
    color: #FFF;
    background: #008DD2;
    border-radius: 5px;
  }
}
</style>
