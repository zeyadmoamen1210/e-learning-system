<template>
  <div>
    <Button
      @click.native="addPdfPopup = true"
      type="success-plain"
      text="إضافة ملف"
      padding="1rem 2.5rem"
    >
      <template>
        <img src="@/assets/imgs/dashboard/video-square-broken-3.svg" alt="" />
      </template>
    </Button>

    <div v-if="pdfs.length > 0">
      <div class="row mt-4">
        <div class="col-md-4" v-for="(pdf, index) in pdfs" :key="index">
          <div class="lesson-pdf d-flex gap-3 align-items-center">
            <div class="">
              <img
                class="lesson-pdf__img"
                src="@/assets/imgs/dashboard/folder-open-bulk4.svg"
                alt=""
              />
            </div>
            <div>
              <h6 class="font-h5">{{ pdf.title }}</h6>
              <p class="font--light font-h6 mb-0">{{ pdf.description }}</p>

              <div class="d-flex gap-3 align-items-center">
                <Button
                  padding="0rem"
                  :type="'text-primary'"
                  :center="true"
                  text="تعديل"
                  text-classes="font-h5 font--regular"
                  @click.native="
                    (currPdf = { ...currPdf, ...pdf }), (updatePdfPopup = true)
                  "
                >
                </Button>
                <a role="button" target="_blank" :href="pdf.content.url" class="font-h6"
                  >رابط الملف</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddPdfPopup
      :isOpened="addPdfPopup"
      :lessonId="lessonId"
      :course="course"
      @close="addPdfPopup = false"
      @added="$emit('reloadCourse')"
    />

    <UpdatePdfPopup
      v-if="updatePdfPopup"
      :isOpened="updatePdfPopup"
      :lessonId="lessonId"
      :course="course"
      :currPdf="{
        ...currPdf,
        url: currPdf?.content?.url,
      }"
      @close="updatePdfPopup = false"
      @added="$emit('reloadCourse')"
    />
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
import AddPdfPopup from "@/components/Dashboard/Popups/AddPdf.vue";
import UpdatePdfPopup from "@/components/Dashboard/Popups/UpdatePdf.vue";

export default {
  components: {
    Button,
    AddPdfPopup,
    UpdatePdfPopup,
  },
  props: {
    pdfs: {
      required: true,
    },
    lessonId: {
      required: true,
    },
    course: {
      required: true,
    },
  },
  data() {
    return {
      addPdfPopup: false,
      updatePdfPopup: false,
      currPdf: {},
    };
  },
};
</script>
