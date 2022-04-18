<template>
  <div class="container">
    <div class="title mt-3">
      <h1>{{ title }}</h1>
      <hr />
    </div>
    <div class="statement">
      <p>{{ statement }}</p>
      <hr />
    </div>
    <div class="inputOutput">
      <div class="">
        <h5>Example Input:</h5>
        <textarea
          class="form-control"
          rows="6"
          cols="100"
          v-model="example_in"
          disabled
        ></textarea>
      </div>
      <div class="example">
        <h5>Example Output:</h5>
        <textarea
          class="form-control"
          rows="6"
          cols="100"
          v-model="example_out"
          disabled
        ></textarea>
      </div>
    </div>
    <hr />
    <div class="buttons">
      <div class="buttons-wrapper">
        <button type="button" class="btn btn-secondary" @click="goBack()">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemPreview",
  props: {
    title: String,
    statement: String,
    example_in: String,
    example_out: String,
    preview: Boolean,
  },
  methods: {
    goBack() {
      this.$emit("update", false);
    },
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
