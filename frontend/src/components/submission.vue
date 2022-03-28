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
        <h5>Status: <span class="textSize">{{ this.status }}</span></h5>
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
    };
  },
  computed: {
      getColor() {
          return {
              'textBlack': this.status === 'In Queue',
              'textGreen': this.status === 'passed',
              'textRed': this.status !== 'passed'
          }
      },
  },
  methods: {
    isChecked(index) {
      return index <= this.passedTestCases;
    },
    timer() {
      // Set time out
      let interval = setInterval(() => {
        // Need to get submission and find passed testcases.
        this.postData("http://localhost:3013/rest/submission/id/", "POST", {
          id: this.$route.params.id,
        }).then((data) => {
          console.log(data[0].passed);
          this.passedTestCases = data[0].passed;
          this.status = data[0].status;
          if (this.passedTestCases === this.numberOfTestCases) clearInterval(interval);
        });
      }, 500);
    },
  },
  mounted() {
    // Solving problem on load.
    this.postData("http://localhost:3013/rest/submission/id/", "POST", {
      id: this.$route.params.id,
    }).then((data) => {
      this.submission = data[0];

      // Need to get number of testcases
      this.postData("http://localhost:3013/rest/testcase/id/", "POST", {
        problem_id: this.submission.problem_id,
      }).then((data) => {
        this.numberOfTestCases = data.length;
        console.log(this.numberOfTestCases);
      });

      if (this.submission.status === "Not Started") {
        this.postData("http://localhost:3013/rest/submission/solve/", "POST", {
          id: this.$route.params.id,
        }).then((data) => {
          console.log(data);
        });
      }
    });
    this.timer();
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
