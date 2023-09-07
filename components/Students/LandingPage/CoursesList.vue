<template>
  <div v-loading="loading">
    <h6 class="courses-list__title">قائمة الكورسات</h6>
    <template v-if="courses.length > 0">
      <div class="row">
        <div class="col-md-6 col-lg-4" v-for="(course, index) in courses" :key="index">
          <div class="course-card">
            <div class="course-card__discount" v-if="+course.discount > 0">
              {{ course.discount + " %" }}
            </div>
            <img
              class="course-card__img"
              v-if="course.image"
              :src="course.image"
              alt=""
            />
            <img
              class="course-card__img"
              v-else
              src="@/assets/imgs/course-imgs/jk-placeholder-image.jpg"
              alt=""
            />
            <div class="course-card__content">
              <div>
                <h6>{{ course.name }}</h6>
                <span class="d-block mb-3">
                  {{ course.description }}
                </span>

                <div class="d-flex gap-2 justify-content-between">
                  <div>
                    <img
                      src="@/assets/imgs/landing-page/vuesax-broken-timer.svg"
                      alt=""
                    />
                    <span>{{ course.duration }}</span>
                  </div>
                  <div>
                    <img
                      src="@/assets/imgs/landing-page/vuesax-broken-timer.svg"
                      alt=""
                    />
                    <span>{{ formatPrice(course.price) }}</span>
                  </div>
                </div>

                <div>
                  <button
                    @click="$router.push(`/student/course/${course.id}/preview`)"
                    class="button button--secondary w-100 d-flex gap-3 justify-content-center mt-4 font-h5 font--regular py-3"
                  >
                    <span>عرض تفاصيل الكورس</span>
                    <span>
                      <img src="@/assets/imgs/course-imgs/arrow-left-linear.svg" alt="" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row-reverse justify-content-center">
        <Button
          padding="1rem"
          :type="'primary-plain'"
          :isForShowAllCourses="true"
          :center="true"
          text="عرض المزيد من الكورسات"
          text-classes="font-h5 font--regular"
          @click.native="$router.push(`/student/course/all`)"
        >
        </Button>
      </div>
    </template>
    <NoData v-else text="لا توجد كورسات" />
  </div>
</template>

<script>
import NoData from "~/components/NoData.vue";
import Button from "@/components/Layouts/Button.vue";
export default {
  methods: {
    async getCourses() {
      this.loading = true;
      try {
        const res = await this.$axios.get(`/courses`, {
          params: {
            page: this.page,
            limit: 6,
          },
        });
        this.courses = res.data.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getCourses();
  },
  data() {
    return {
      courses: [],
      loading: false,
    };
  },
  components: { NoData, Button },
};
</script>
