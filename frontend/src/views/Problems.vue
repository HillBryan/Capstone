<template>
  <div class="container mt-2">
    <div v-if="spinner" class="spinner-border spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!spinner" class="header">
      <h1>Problems</h1>
    </div>
    <hr />
    <div v-if="!spinner" class="problems">
      <card
        v-for="problem in problems"
        :key="problem._id"
        :problem="problem"
      ></card>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import card from "../components/problemCard.vue";

export default {
  name: "Problems",
  components: { card },
  mixins: [ApiMixin],
  data: function () {
    return {
      problems: [],
      spinner: true,
    };
  },
  mounted() {
    this.postData("http://localhost:3013/rest/problem/class/", "POST", {
      class_id: this.$route.params.class,
    }).then((data) => {
      this.problems = data;
      this.spinner = false;
    });
  },
  methods: {},
};
</script>

<style scoped>
.spinner {
  margin-left: 50%;
  zoom: 200%;
}
</style>
