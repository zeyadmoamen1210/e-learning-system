<template>
  <div>
    <CourseHeader :isSubscribedIn="true" />

    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8">
          <SelectedContent
            ref="selectedContent"
            :selectedContent="selectedContent || preview"
          />
        </div>
        <div class="col-lg-4">
          <ContentList
            showPreview
            @selectContent="selectContent"
            @showPreview="showPreview"
            :lessons="lessons"
            :preview="preview"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseHeader from "@/components/Students/Course/Header.vue";
import SelectedContent from "@/components/Students/Course/SelectedContent.vue";
import ContentList from "@/components/Students/Course/ContentList.vue";

export default {
  name: "MyCourse",
  components: {
    CourseHeader,
    SelectedContent,
    ContentList,
  },
  methods: {
    selectContent(content) {
      this.$refs.selectedContent.selectedContentStarted = false;

      this.$refs.selectedContent.examSubmitted = false;

      this.selectedContent = content;
    },
    showPreview(e) {
      this.$refs.selectedContent.selectedContentStarted = false;

      this.$refs.selectedContent.examSubmitted = false;

      this.selectedContent = null;
    },
  },
  data() {
    return {
      isHasOffer: true,
      selectedContent: null,
      preview: {
        type: "video",
        title: "الفيديو التعريفي",
        description: "عنوان للفيديو التعريفي بالكورس",
        time: "1:30",
        link: "https://www.youtube.com/embed/LJm9p4QstNU",
      },
      lessons: [
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/LJm9p4QstNU",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الثاني",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/Qab2eMZ2G8c",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الثالث",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/BlZeNZlo7l0",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الرابع",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/rBhHQCYNlr8",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/e0CLfmb9w0Q",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/q75Puy0mL8s",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/iqwr667_ycU",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/QLxcwSJ8MvI",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
              description: "جميع المرفقات الخاصة بالدرس",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/EmqOxWJCYlo",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
        {
          name: "الدرس الأول",
          materials: [
            {
              type: "video",
              title: "عنوان الدرس الأول",
              description: "وصف بسيط عن الدرس",
              time: "1:30",
              link: "https://www.youtube.com/embed/JJ2nP6un4UY",
            },
            {
              type: "pdf",
              title: "مرفقات الدرس",
              description: "جميع المرفقات الخاصة بالدرس",
              link: "https://www.africau.edu/images/default/sample.pdf",
            },
            {
              type: "test",
              title: "الاختبار",
              description: "الاختبار الخاص بالدرس الأول",
            },
          ],
        },
      ],
    };
  },
};
</script>
