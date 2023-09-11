<template>
  <div :data-ph="placeholder" v-html="value" class="custom-editor" @keyup="updateText" contenteditable="true"></div>
</template>

<script>
export default {
  methods: {
    updateText(e) {
      if(e.target.innerText.trim().replace(/\n/g, '') === '') {
        this.$emit('setText', {
          text: null,
          html: null,
        });
        return;
      }
      this.$emit('setText', {
        text: e.target.innerText,
        html: e.target.innerHTML,
      });
    }
  },
  props: {
    value: {
      required: true,
    },
    placeholder: {
      required: false,
    }
  }
}
</script>
