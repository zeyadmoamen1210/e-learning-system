<template>
  <div class="attach-photo">
    <div :class="url ? 'have-url' : ''" class="attach-photo__img-container">
      <input @change="attachFile" type="file" />
      <img v-if="!url" src="@/assets/imgs/dashboard/gallery-add-linear.png" alt="" />
      <img v-else :src="url" alt="" />
    </div>
    <div>
      <h6 class="font-h5 font--regular">صورة السؤال</h6>
      <span class="d-block font-h6 font--light">قم بالنقر علي الصورة</span>
      <span class="d-block font-h6 font--light">هنا تكتب ملاحظات للصور</span>
      <span class="d-block font-h6 font--light"> الذي سيتم إرفاقه </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photo: "",
      url: "",
    };
  },
  methods: {
    attachFile(e) {
      if (e.target.files.length > 0) {
        this.photo = e.target.files[0];
        this.url = URL.createObjectURL(this.photo);
      }
    },
  },
};
</script>
