<template>
  <div class="container">
    <div class="header text-center mt-2">
      <h1>Create Course</h1>
      <hr />
    </div>
    <div class="code">
      <h5>Course Name:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Name..."
        v-model="courseName"
      />
      <hr />

      <h5>Course Code:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Code..."
        v-model="courseCode"
      />
      <hr />

      <h5>Course Instructor:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Instructor..."
        v-model="courseInstructor"
      />
      <hr />
      <div class="buttons-wrapper">
        <button type="button" class="btn btn-secondary mr-2" @click="goBack()">
          Back
        </button>
        <button type="button" class="btn btn-primary mr-0" @click="route()">
          Create
        </button>
      </div>
    </div>
    <div class="grading"></div>
  </div>
</template>

<script>
export default {
  name: "CreateClass",
  components: {},
  data() {
    return {
        courseName: '',
        courseCode: '',
        courseInstructor: '',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.buttons-wrapper {
  width: fit-content;
  margin-left: auto;
}
</style>
