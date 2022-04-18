<template>
  <div>
    <div v-if="preview">
      <problem-preview
        :title="problemTitle"
        :statement="problemDescription"
        :example_in="exampleInput"
        :example_out="exampleOutput"
        :preview="preview"
        @update="preview=$event"
      ></problem-preview>
    </div>
    <div v-if="!preview">
      <div class="container">
        <div class="topRow mt-3">
          <h1 class="ml-auto">Create Problem</h1>
          <button
            type="button"
            class="btn btn-secondary ml-auto"
            @click="preview = true"
          >
            Preview
          </button>
        </div>

        <hr />

        <div class="code">
          <h5>Problem Title:</h5>
          <input
            type="text"
            class="form-control"
            id="courseNameInput"
            placeholder="Course Name..."
            v-model="problemTitle"
          />
          <hr />

          <h5>Problem Description:</h5>
          <textarea
            class="form-control"
            rows="6"
            cols="100"
            v-model="problemDescription"
          ></textarea>
          <hr />

          <h5>Example Input:</h5>
          <textarea
            class="form-control"
            rows="6"
            cols="100"
            v-model="exampleInput"
          ></textarea>
          <hr />

          <h5>Example Output:</h5>
          <textarea
            class="form-control"
            rows="6"
            cols="100"
            v-model="exampleOutput"
          ></textarea>
          <hr />

          <h2>Testcase Input</h2>

          <hr />
          <div
            v-for="(testcase, counter) in testCases"
            :key="counter"
            class="inputOutput"
          >
            <div class="mb-3">
              <h5>Example Input:</h5>
              <textarea
                class="form-control"
                rows="6"
                cols="100"
                v-model="testcase.input"
              ></textarea>
            </div>
            <div class="example">
              <h5>Example Output:</h5>
              <textarea
                class="form-control"
                rows="6"
                cols="100"
                v-model="testcase.output"
              ></textarea>
            </div>
            <h5>
              <span class="delete" @click="removeTestCase(counter)"
                >&#10006;</span
              >
            </h5>
          </div>

          <div class="cardAdd ml-auto mr-auto" @click="addTestCase">
            <h5 class="text-center m-auto sizing">
              Add Testcase <span>&#10753;</span>
            </h5>
          </div>

          <hr />

          <div class="buttons-wrapper mb-3">
            <button
              type="button"
              class="btn btn-secondary mr-2"
              @click="goBack()"
            >
              Back
            </button>
            <button type="button" class="btn btn-primary mr-0" @click="route()">
              Create
            </button>
          </div>
        </div>
        <div class="grading"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProblemPreview from "./ProblemPreview.vue";

export default {
  name: "CreateProblem",
  components: { ProblemPreview },
  data() {
    return {
      preview: false,
      problemTitle: "",
      problemDescription: "",
      exampleInput: "",
      exampleOutput: "",
      testCases: [
        {
          input: "",
          output: "",
        },
      ],
    };
  },
  methods: {
    addTestCase() {
      this.testCases.push({ input: "", output: "" });
    },
    removeTestCase(index) {
      this.testCases.splice(index, 1);
    },
    route() {},
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.cardAdd {
  margin-top: 3%;
  margin-bottom: 2%;
  height: 10vh;
  width: 12vw !important;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.cardAdd:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.sizing {
  font-size: 1.4vw;
}

.inputOutput {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.buttons-wrapper {
  width: fit-content;
  margin-left: auto;
}

.example {
  margin-left: 5%;
}

.topRow {
  display: flex;
  flex-direction: row;
}

.center {
  justify-content: center;
}

.delete:hover {
  transform: scale(1.05);
  cursor: pointer;
  text-decoration: underline;
}
</style>
