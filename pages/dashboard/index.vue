<template>
  <div v-loading.fullscreen="loading">
    <div v-show="!loading">

      <h6 class="font-h4 mb-4">إحصائيات عامة</h6>

      <div class="stats-container">
        <div class="stats-item stats-item--1">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'user-graduate']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الطُلاب</h5>
            <span> {{formatNumber(stats.students)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--2">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'user-plus']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الطُلاب الفعالة</h5>
            <span> {{formatNumber(stats.activeStudents)}} </span>
          </div>
        </div>

        <div class="stats-item stats-item--3">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'user-xmark']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الطُلاب الغير فعالة</h5>
            <span> {{formatNumber(stats.inActiveStudents)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--4">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'user-check']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الطُلاب المُشتركة</h5>
            <span> {{formatNumber(stats.subscribedStudents)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--5">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'percent']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الأكواد الفعالة</h5>
            <span> {{formatNumber(stats.activatedCodes)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--6">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'certificate']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الكورسات</h5>
            <span> {{formatNumber(stats.courses)}} </span>
          </div>
        </div>
        </div>

        <h6 class="font-h4 mb-4">محتويات الكورس</h6>
        <div class="stats-container">
        <div class="stats-item stats-item--7">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'file-pdf']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الملفات</h5>
            <span> {{formatNumber(stats?.materials?.[stats?.materials?.findIndex(ele => ele.type === 'PDF')]?.total)}} </span>
          </div>
        </div>



        <div class="stats-item stats-item--8">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'file-circle-question']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الإمتحانات</h5>
            <span> {{formatNumber(stats?.materials?.[stats?.materials?.findIndex(ele => ele.type === 'EXAM')]?.total)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--9">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'video']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الفديوهات</h5>
            <span> {{formatNumber(stats?.materials?.[stats?.materials?.findIndex(ele => ele.type === 'VIDEO')]?.total)}} </span>
          </div>
        </div>
        </div>

        <h6 class="font-h4 mb-4">الأسئلة</h6>

    <div class="stats-container">

        <div class="stats-item stats-item--10">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'question']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الأسئلة الإختيارية</h5>
            <span> {{formatNumber(stats?.questions?.[stats?.questions?.findIndex(ele => ele.type === 'choose')]?.total)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--11">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'image']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الأسئلة الإختيارية بصور</h5>
            <span> {{formatNumber(stats?.questions?.[stats?.questions?.findIndex(ele => ele.type === 'choose_image')]?.total)}} </span>
          </div>
        </div>


        <div class="stats-item stats-item--12">
          <div>
            <font-awesome-icon style="font-size: 3.5rem" :icon="['fas', 'text-width']" />
          </div>
          <div>
            <h5 class="font-h5 font--semibold"> الأسئلة  المقالية</h5>
            <span> {{formatNumber(stats?.questions?.[stats?.questions?.findIndex(ele => ele.type === 'paragraph')]?.total)}} </span>
          </div>
        </div>

      </div>


      </div>
    </div>
</template>

<script>

export default {
  middleware: ['prevent-student'],
  layout: "dashboard",
  data() {
    return {
      loading: false,
      stats: {}
    }
  },
  mounted() {
    this.getStats();
  },
  methods: {
    async getStats() {
      this.loading = true;
      try {
        const res = await this.$axios.get('/statics');
        this.stats = res.data;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" >
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: 2rem;
  gap: 2rem;
  border-bottom: 1px solid #ccc;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  .stats-item {
    padding: 1.5rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 1rem;
    color: #fff;

    span {
      font-size: 3.5rem;
    }

    &--1 {
      background: #6a89cc;
    }
    &--2 {
      background: #4a69bd;
    }
    &--3 {
      background: #1e3799;
    }
    &--4 {
      background: #0c2461;
    }
    &--5 {
      background: #82ccdd;
    }
    &--6 {
      background: #60a3bc;
    }
    &--7 {
      background: #3c6382;
    }
    &--8 {
      background: #0a3d62;
    }
    &--9 {
      background: #b8e994;
    }


    &--10 {
      background: #78e08f;
    }
    &--11 {
      background: #38ada9;
    }
    &--12 {
      background: #079992;
    }

    span , h6 {
      color: #fff;
    }
  }
}
</style>
