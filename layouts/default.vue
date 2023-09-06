<template>
  <div>
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
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
