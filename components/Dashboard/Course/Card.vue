<template>
  <div class="dashboard-course">
    <div class="dashboard-course__inner">
      <div>
        <img class="dashboard-course__img" :src="details.image" alt="" />
      </div>
      <div class="dashboard-course__body">
        <h6 class="font-h5 mb-3 font--regular">{{ details.name }}</h6>
        <p class="font--light font-h6 dashboard-course__desc">
          {{ details.description }}
        </p>

        <div class="d-flex gap-3">
          <div>
            <img src="@/assets/imgs/course-imgs/timer-broken.png" alt="" />
            <span class="font-h6 font--regular">4 ساعات</span>
          </div>
          <div>
            <img src="@/assets/imgs/course-imgs/vuesax-broken-wallet.png" alt="" />
            <span class="font-h6 font--regular"> {{ details.price }} جنية</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 d-flex gap-2 dashboard-course__btns">
      <Button
        class="flex-grow-1"
        padding="1rem 4rem"
        :type="'null'"
        :center="true"
        text="عرض التفاصيل"
        text-classes="font-h5 font--regular"
        @click.native="$router.push(`/dashboard/courses/${details.id}`)"
      >
        <img src="@/assets/imgs/dashboard/vuesax-bulk-frame.svg" alt="" />
      </Button>
      <Button
        class="flex-grow-1"
        padding="1rem"
        :type="'primary-plain'"
        :center="true"
        text="تعديل"
        text-classes="font-h5 font--regular"
        @click.native="$router.push(`/dashboard/courses/${details.id}`)"
      >
        <img src="@/assets/imgs/dashboard/vuesax-bulk-edit-2.svg" alt="" />
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    details: {
      required: true,
    },
  },
};
</script>
