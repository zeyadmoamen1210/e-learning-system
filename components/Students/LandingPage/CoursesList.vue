<template>
  <div>
    <h6 class="courses-list__title">قائمة الكورسات</h6>
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="(course, index) in courses" :key="index">
        <div class="course-card">
          <img class="course-card__img" :src="course.image" alt="" />
          <div class="course-card__content">
            <div>
              <h6>{{ course.name }}</h6>
              <span class="d-block mb-3">
                {{ course.description }}
              </span>

              <div class="d-flex gap-2 justify-content-between">
                <div>
                  <img src="@/assets/imgs/landing-page/vuesax-broken-timer.svg" alt="" />
                  <span>{{ course.time }}</span>
                </div>
                <div>
                  <img src="@/assets/imgs/landing-page/vuesax-broken-timer.svg" alt="" />
                  <span>{{ course.price }}</span>
                </div>
              </div>

              <div>
                <button
                  @click="$router.push('/student/course/1/preview')"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
        {
          name: "مبادئ أساسيات الفيزياء",
          description: "هنا يكتب بنذة بسيطة عن الكورس في هذا السطر",
          time: "4 ساعات",
          price: "750 جنية",
          image: "https://i.ibb.co/K5bffN7/course-img.jpg",
        },
      ],
    };
  },
};
</script>
