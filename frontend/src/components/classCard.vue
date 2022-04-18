<template>
  <div class="card" @click="route()">
    <div class="card-info ml-2">
      <h2>{{ this.course.name }}</h2>
      <h5>{{ this.course.instructor }}</h5>
      <span>{{ this.course.code }}</span><br>
      <span>Code: {{ this.course.course_secret }}</span>
    </div>
    <div class="card-grade ml-auto mr-2">
      <h3 class="text-center">{{ getLetter() }}</h3>
      <h3>{{ getPercentage() }}%</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    course: Object,
    enrolled: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    route() {
      this.$router.push({ name: 'Problems', params: { class: this.course._id } })
    },
    getLetter() {
      if (!this.course.grade) return 'A';
      if (this.course.grade >= 93) return "A";
      if (this.course.grade >= 90) return "A-";
      if (this.course.grade >= 87) return "B+";
      if (this.course.grade >= 85) return "B";
      if (this.course.grade >= 80) return "B-";
      if (this.course.grade >= 77) return "C+";
      if (this.course.grade >= 75) return "C";
      if (this.course.grade >= 70) return "C-";
      if (this.course.grade >= 67) return "D+";
      if (this.course.grade >= 65) return "D";
      if (this.course.grade >= 60) return "D-";
      return "F";
    },
    getPercentage() {
      return this.course.grade ? this.course.grade : 100;
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 2%;
  height: 10rem;
  width: 100% !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.card-info {
  justify-content: flex-start;
}

.card-grade {
  justify-content: flex-end;
}

.card:hover {
  transform: scale(1.05);
  cursor: pointer;
}

</style>
