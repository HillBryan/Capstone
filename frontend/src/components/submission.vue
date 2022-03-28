<template>
  <div class="container">
    <div class="header">
      <h5 class="text-center mt-2">Submission: {{ this.submission._id }}</h5>
      <hr />
    </div>
    <div class="code">
      <h5>Your Submission:</h5>
      <textarea
        class="form-control"
        rows="10"
        cols="100"
        placeholder="Enter code here..."
        v-model="this.submission.submissionText"
        disabled
      ></textarea>
      <hr />
    </div>
    <div class="grading">
      <div class="status">
        <h5>
          Status: <span class="textSize">{{ this.status }}</span>
        </h5>
        <h5 v-if="status === 'Passed' && end">
          <p class="textSize">
            Average: {{ Math.round(this.end / this.numberOfTestCases) }}ms
          </p>
          <p class="textSize">Total: {{ this.end }}ms</p>
        </h5>
      </div>
      <div class="boxes">
        <input
          v-for="index in numberOfTestCases"
          :key="index"
          type="checkbox"
          class="box"
          :checked="isChecked(index)"
        />
      </div>
      <div v-if="this.status === 'Wrong Answer' && this.input">
        <p>
          Input: {{ this.input }}, Expected: {{ this.expected }}, Actual:
          {{ this.actual }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";

export default {
  name: "submission",
  mixins: [ApiMixin],
  data() {
    return {
      submission: {},
      status: "In Queue",
      numberOfTestCases: 0,
      passedTestCases: 0,
      interval: undefined,
      expected: "",
      actual: "",
      input: "",
      start: Date.now(),
      end: 0,
      ipaddr: "",
    };
  },
  methods: {
    isChecked(index) {
      return index <= this.passedTestCases;
    },
    timer() {
      // Set time out
      this.interval = setInterval(() => {
        // Need to get submission and find passed testcases.
        this.postData("http://localhost:3013/rest/submission/id/", "POST", {
          id: this.$route.params.id,
        }).then((data) => {
          this.passedTestCases = data[0].passed;
          this.status = data[0].status;
          if (
            this.passedTestCases === this.numberOfTestCases ||
            this.status === "Wrong Answer" ||
            this.status === "Compile Error" ||
            this.status === "Run Time Error"
          ) {
            clearInterval(this.interval);
          }
        });
      }, 500);
    },
  },
  mounted() {
    // Solving problem on load.

    this.postData("http://localhost:3014/rest/balance/ip/", "POST", {}).then(
      (data) => {
        this.ipaddr = data[0].ip;
        this.postData("http://localhost:3013/rest/submission/id/", "POST", {
          id: this.$route.params.id,
        }).then((data) => {
          this.submission = data[0];

          // Need to get number of testcases
          this.postData("http://localhost:3013/rest/testcase/id/", "POST", {
            problem_id: this.submission.problem_id,
          }).then((data) => {
            this.numberOfTestCases = data.length;
          });
          console.log("ip", this.ipaddr);
          if (this.submission.status === "Not Started") {
            this.postData(this.ipaddr + "/rest/submission/solve/", "POST", {
              id: this.$route.params.id,
            }).then((data) => {
              this.end = Date.now() - this.start;
              if (data.status === "Wrong Answer") {
                this.expected = data.expected;
                this.actual = data.actual;
                this.input = data.input;
              }
            });
          }
        });
      }
    );
    this.timer();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.boxes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.box {
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.textGreen {
  color: green;
}

.textRed {
  color: red;
}

.textBlack {
  color: black;
}

.textSize {
  font-size: 1.5rem;
}
</style>
