<template>
  <div class="question-correct">
    <div class="d-flex flex-wrap justify-content-between">
      <div>
        <h6 class="font-h4 font--regular">سؤال بصيغة بم تفسر ؟</h6>
        <span class="d-block font-h5 font--light"> الدرس الأول </span>

        <div>
          <span class="d-block font-h5 font--light text-success" v-if="false"> سهل </span>
          <span class="d-block font-h5 font--light text-warning" v-if="true">
            متوسط
          </span>
          <span class="d-block font-h5 font--light text-danger" v-if="false"> صعب </span>
        </div>
      </div>
      <div>
        <Button
          padding="1rem 4rem"
          :type="'success-plain'"
          :center="true"
          text="عرض الإجابة النموذجية"
          text-classes="font-h5 font--regular"
        >
        </Button>
      </div>
    </div>

    <div class="mt-5">
      <h6 class="font-h5 font--semibold mt-4 text-plain-success">إجابة الطالب</h6>
      <p class="font-h5 font--light">
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن
        التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك
        يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما
      </p>
      <div class="row">
        <div class="col-md-3">
          <div>
            <el-input class="mt-3" placeholder="ضع درجة التصحيح"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Layouts/Button.vue";
export default {
  components: {
    Button,
  },
};
</script>
