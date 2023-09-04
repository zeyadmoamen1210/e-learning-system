<template>
  <div>
    <CorrectedAndPassed
      :points="examData?.userLastSolution?.mark"
      :totalMarks="totalMarks"
      v-if="ifStudentPassedTheExam"
      :canSolveAgain="canSolveAgain"
      @solveAgain="$emit('solveAgain')"
      @showModelAnswer="$emit('showModelAnswer')"
    />
    <CorrectedAndNotPassed
      v-else
      :points="examData?.userLastSolution?.mark"
      :totalMarks="totalMarks"
      :canSolveAgain="canSolveAgain"
      @solveAgain="$emit('solveAgain')"
      @showModelAnswer="$emit('showModelAnswer')"
    />
  </div>
</template>

<script>
import CorrectedAndNotPassed from "./CorrectedAndNotPassed.vue";
import CorrectedAndPassed from "./CorrectedAndPassed.vue";
export default {
  components: {
    CorrectedAndNotPassed,
    CorrectedAndPassed,
  },
  props: {
    examData: {
      required: true,
    },
    canSolveAgain: {
      required: true,
    },
  },
  computed: {
    totalMarks() {
      return this.examData?.exam?.exam_questions?.reduce(
        (prev, curr) => (prev += +curr.mark),
        0
      );
    },
    ifStudentPassedTheExam() {
      return (
        this.examData?.userLastSolution?.mark >= this.examData?.exam?.content?.pass_from
      );
    },
  },
};
</script>
