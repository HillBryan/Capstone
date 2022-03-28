<template>
  <div class="container mt-2">
    <div class="header">
      <h1>Courses</h1>
    </div>
    <hr />
    <div class="Courses">
      <card v-for="course in courses" :key="course.id" :course="course"></card>
    </div>
  </div>
</template>

<script>

import card from '../components/classCard.vue'

export default {
  name: "Classes",
  components: { card },
  data: function() {
    return {
      courses: [
        {
          name: 'Data Structures',
          id: 100,
          instructor: 'Dr. Mohan',
          course_code: 'CS 3460',
          grade: '100',
        },
        {
          name: 'Algorithms',
          id: 101,
          instructor: 'Dr. Mohan',
          course_code: 'CS 3450',
          grade: '91.2',
        },
        {
          name: 'Software Engineering',
          id: 102,
          instructor: 'Dr. Tashakkori',
          course_code: 'CS 3667',
          grade: '86.12',
        },
      ],
    }
  },
  created() {

  },
};
</script>

<style scoped>



</style>
