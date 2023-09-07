<template>
  <div class="attach-photo">
    <div :class="url || image ? 'have-url' : ''" class="attach-photo__img-container">
      <input @change="attachFile" type="file" />
      <img
        v-if="!url && !image"
        src="@/assets/imgs/dashboard/gallery-add-linear.png"
        alt=""
      />
      <img v-if="!(!url && !image) && type != 'pdf'" :src="url || image" alt="" />
      <img
        v-if="!(!url && !image) && type == 'pdf'"
        src="@/assets/imgs/dashboard/folder-open-bulk4.svg"
        alt=""
        style="max-width: 10rem"
      />
    </div>
    <div>
      <h6 class="font-h5 font--regular">{{ title }}</h6>
      <span class="d-block font-h6 font--light">قم بالنقر للإضافة </span>
      <span class="d-block font-h6 font--light">هنا يتم إضافة صورة او ملف</span>
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
  props: {
    type: {
      required: false, // pdf
    },
    title: {
      required: true,
      type: String,
    },
    image: {
      required: false,
    },
  },
  methods: {
    attachFile(e) {
      if (e.target.files.length > 0) {
        if (this.type === "pdf") {
          if (e.target.files[0].type !== "application/pdf") {
            this.$emit("error", "يجب ان يكون الملف من امتداد PDF");
            return;
          }
        }
        this.photo = e.target.files[0];
        this.url = URL.createObjectURL(this.photo);
        this.$emit("getPhoto", this.photo);
      }
    },
  },
};
</script>
