<template>
  <div class="container">
    <div class="header">
      <h5 class="text-center mt-2">Submission: {{ this.submission._id }}</h5>
      <hr />
    </div>
    <div class="code">
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
    <!-- <div class="input">
      <div class="textInput">
        <span class="enterText mr-2">Enter Class Name: </span>
        <input
          type="text"
          class="form-control classInput"
          id="mainClassInput"
          placeholder="Main Class..."
          v-model="className"
        />
      </div>
      <div class="buttons-wrapper">
        <button type="button" class="btn btn-secondary" @click="goBack()">
          Back
        </button>
        <button type="button" class="btn btn-primary mr-0" @click="route()">
          Submit
        </button>
      </div>
    </div> -->
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
    };
  },
  mounted() {
    this.postData("http://localhost:3013/rest/submission/id/", "POST", {
      id: this.$route.params.id,
    }).then((data) => {
      this.submission = data[0];
      if (this.submission.status === "Not Started") {
        this.postData("http://localhost:3013/rest/submission/solve/", "POST", {
          id: this.$route.params.id,
        }).then((data) => {
          console.log(data);
        });
      }
    });

    console.log('async?');
  },
};
</script>

<style></style>
