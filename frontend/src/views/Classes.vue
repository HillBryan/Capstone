<template>
  <div class="container mt-2">
    <div class="header">
      <h1>Courses</h1>
    </div>
    <hr />
    <div class="Courses">
      <card v-for="course in courses" :key="course.id" :course="course"></card>
      <div class="cardAdd" @click="showModal = !showModal">
        <h1 class="text-center m-auto">Add Class</h1>
      </div>
    </div>
    <modal v-if="showModal"></modal>
  </div>
</template>

<script>
import card from "../components/classCard.vue";
import modal from "../components/modal.vue"

export default {
  name: "Classes",
  components: { card, modal },
  data: function () {
    return {
      showModal: false,
      courses: [
        {
          name: "Data Structures",
          id: 100,
          instructor: "Dr. Mohan",
          course_code: "CS 3460",
          grade: "100",
        },
        {
          name: "Algorithms",
          id: 101,
          instructor: "Dr. Mohan",
          course_code: "CS 3450",
          grade: "91.2",
        },
      ],
    };
  },
  methods: {

  },
  created() {},
};
</script>

<style scoped>
.cardAdd {
  margin-top: 2%;
  margin-bottom: 2%;
  height: 8rem;
  width: 100% !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.cardAdd:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
