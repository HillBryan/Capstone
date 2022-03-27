<template>
  <div class="container">
    <div class="title mt-3">
      <h1>{{ this.problem.title }}</h1>
      <hr />
    </div>
    <div class="statement">
      <p>{{ this.problem.statement }}</p>
      <hr />
    </div>
    <div class="inputOutput">
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
    <hr>
    <div class="buttons">
        <div class="buttons-wrapper">
            <button type="button" class="btn btn-secondary" @click="goBack()">Back</button>
            <button type="button" class="btn btn-primary mr-0">Submit</button>
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
    };
  },
  methods: {
      goBack() {
          this.$router.go(-1);
      }
  },
  mounted() {
    this.postData("http://localhost:3013/rest/problem/id/", "POST", {
      id: this.$route.params.id,
    }).then((data) => {
      this.problem = data[0];
    });
  },
};
</script>

<style scoped>
.problem {
  display: flex;
  flex-direction: column;
}

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
</style>
