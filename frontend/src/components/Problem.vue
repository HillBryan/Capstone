<template>
  <div class="container">
    <div v-if="spinner" class="spinner-border spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!spinner" class="title mt-3">
      <h1>{{ this.problem.title }}</h1>
      <hr />
    </div>
    <div v-if="!spinner" class="statement">
      <p>{{ this.problem.statement }}</p>
      <hr />
    </div>
    <div v-if="!spinner" class="inputOutput">
      <div class="">
        <h5>Example Input:</h5>
        <textarea
          class="form-control"
          rows="6"
          cols="100"
          v-model="this.problem.example_in"
          disabled
        ></textarea>
      </div>
      <div class="example">
        <h5>Example Output:</h5>
        <textarea
          class="form-control"
          rows="6"
          cols="100"
          v-model="this.problem.example_out"
          disabled
        ></textarea>
      </div>
    </div>
    <hr />
    <div v-if="!spinner" class="buttons">
      <div class="buttons-wrapper">
        <button type="button" class="btn btn-secondary" @click="goBack()">
          Back
        </button>
        <button type="button" class="btn btn-primary mr-0" @click="route()">
          Solve
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";

export default {
  name: "Problem",
  mixins: [ApiMixin],
  data() {
    return {
      problem: {},
      spinner: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    route() {
      this.$router.push({ name: "Solve", params: { id: this.problem._id } });
    },
  },
  mounted() {
    this.postData("http://localhost:3013/rest/problem/id/", "POST", {
      id: this.$route.params.id,
    }).then((data) => {
      this.problem = data[0];
      this.spinner = false;
    });
  },
};
</script>

<style scoped>
.inputOutput {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.btn {
  margin: 10px;
}

.buttons-wrapper {
  width: fit-content;
  margin-left: auto;
}

.example {
  margin-left: 5%;
}

.spinner {
  margin-left: 50%;
  zoom: 200%;
}
</style>
