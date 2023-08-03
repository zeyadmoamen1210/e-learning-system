<template>
  <div>
    <div class="home-page">
      <div class="container">
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
  components: {
    Header,
    AboutUs,
    AboutPhysics,
    CoursesList,
  },
};
</script>
