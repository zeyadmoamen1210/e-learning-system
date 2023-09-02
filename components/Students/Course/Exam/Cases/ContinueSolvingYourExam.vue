<template>
  <div>
    <div class="selected-content__pdf">
      <div class="selected-content__pdf-inner">
        <img src="@/assets/imgs/course-imgs/test.svg" alt="" />
        <h6 class="font-h4 text-center">إستكمال الإمتحان</h6>
        <span class="d-block font--light font-h5 text-center">
          قم بالضغط لإستكمال امتحانك
        </span>
        <button @click="$emit('continue')" class="button button--primary mt-3">
          استكمال الاختبار
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
