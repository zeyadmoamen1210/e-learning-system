<template>
  <div>
    <div class="selected-content__pdf">
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/test.svg" alt="" />
        <h6 class="font-h4 text-center">هل أنت جاهز للاختبار ؟</h6>
        <span class="d-block font--light font-h5 text-center">
          قم بالضغط إذا كنت متأكد من أنك جاهز وتريد بدأ الاختبار
        </span>
        <button @click="$emit('start')" class="button button--primary mt-3">
          ابدأ الاختبار
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
