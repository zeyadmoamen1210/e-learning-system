<template>
  <div class="our-whatsapp-container">
    <div class="our-whatsapp-inner">
      <button @click="openWhatsapp" class="our-whatsapp">
        <font-awesome-icon :icon="['fab', 'whatsapp']" />
      </button>

      <div class="our-whatsapp-tooltip" v-if="visible">
        <div class="d-flex justify-content-between gap-2 flex-wrap">
          <h6>تحدث مع فريقنا</h6>
          <font-awesome-icon @click="visible = false" class="text-danger" role="button" :icon="['fas', 'xmark']" />
        </div>
        <p>
          إذا لديك إستفسار، تواصل معنا واكتشف كيف يمكننا مساعدتك 🤓.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openWhatsapp() {
      if (process.client) {
          window.open(process.env.WHATSAPP_LINK, "_blank");
      }
    },
  },
  data() {
    return {
      visible: true
    }
  }
}
</script>
