<template>
  <div>
    <Loading v-if="appLoading" />
    <div>
      <Navbar />
    </div>

    <main id="default-layout">
      <nuxt />
    </main>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
import Loading from "~/components/Layouts/Loading.vue";

export default {
  components: {
    Navbar,
    Footer,
    Loading,
  },
  data() {
    return {
      appLoading: false,
    };
  },
  created() {
    if (!this.$nuxt.context.from) {
      this.appLoading = true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.appLoading = false;
    }, 3000);
  },
};
</script>
