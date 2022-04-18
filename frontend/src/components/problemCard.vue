<template>
  <div class="card" @click="route()">
    <div class="card-info ml-2">
      <h2>{{ this.problem.title }}</h2>
    </div>
    <div class="card-difficulty ml-auto mr-2 text-center">
      <h5>Difficulty: {{ this.problem.difficulty }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    problem: Object,
    enrolled: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    route() {
      this.$router.push({ name: "Problem", params: { id: this.problem._id } });
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 2%;
  height: 10rem;
  width: 100% !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
