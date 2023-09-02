<template>
  <div>
    <CorrectedAndPassed
      :points="examData?.userLastSolution?.mark"
      :totalMarks="totalMarks"
      :timeSpent="timeSpent"
      v-if="ifStudentPassedTheExam"
      :canSolveAgain="canSolveAgain"
      @solveAgain="$emit('solveAgain')"
      @showModelAnswer="$emit('showModelAnswer')"
    />
    <CorrectedAndNotPassed
      v-else
      :points="examData?.userLastSolution?.mark"
      :totalMarks="totalMarks"
      :timeSpent="timeSpent"
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
    timeSpent() {
      return (
        new Date(this.examData?.userLastSolution?.end_at).getTime() -
        new Date(this.examData?.userLastSolution?.created_at).getTime()
      );
    },
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
