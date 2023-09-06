<template>
  <div>
    <div>
      <cursor-fx ref="cursor" disabled />
    </div>
    <div
      class="home-page"
      @mouseenter="activeTheCursor()"
      @mouseleave="deactiveTheCursor()"
    >
      <div class="container">
        <div class="snowflake-container">
          <div class="snowflake" v-for="x in 50" :key="x"></div>
        </div>
        <Header />
      </div>
    </div>
    <div class="about-us" id="about-us">
      <div class="container">
        <AboutUs />
      </div>
    </div>
    <div class="about-physics" id="about-physics">
      <div class="container">
        <AboutPhysics />
      </div>
    </div>
    <div class="courses-list" id="courses-list">
      <div class="container">
        <CoursesList />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Students/LandingPage/Header.vue";
import AboutUs from "@/components/Students/LandingPage/AboutUs.vue";
import AboutPhysics from "@/components/Students/LandingPage/AboutPhysics.vue";
import CoursesList from "@/components/Students/LandingPage/CoursesList.vue";

export default {
  name: "IndexPage",
  middleware: ["not-admin"],
  auth: false,
  components: {
    Header,
    AboutUs,
    AboutPhysics,
    CoursesList,
  },
  methods: {
    activeTheCursor() {
      this.$refs.cursor.refresh();
    },
    deactiveTheCursor() {
      this.$refs.cursor.destroy();
    },
  },
};
</script>
