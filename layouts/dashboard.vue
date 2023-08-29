<template>
  <div>
    <div>
      <Navbar />
    </div>

    <main id="dashboard-layout">
      <div class="container">
        <div class="dashboard-content">
          <div class="row">
            <div class="col-md-12 col-lg-3 order-2 order-lg-1">
              <div class="sidebar-outer mb-5">
                <Sidebar />
              </div>
            </div>
            <div class="col-lg-9 order-1 order-lg-2">
              <div class="w-100 mb-5" style="overflow-x: auto">
                <nuxt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";

import Sidebar from "@/components/Dashboard/Sidebar";

export default {
  components: {
    Navbar,
    Footer,
    Sidebar,
  },
};
</script>
