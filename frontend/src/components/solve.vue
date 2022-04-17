<template>
  <div class="container">
    <div class="header">
      <h1 class="text-center mt-2">Solving: {{ this.problem.title }}</h1>
      <hr />
    </div>
    <div class="code">
      <CodeMirror :height="null" :width="25" ref="codeMirror"></CodeMirror>
      <hr />
    </div>
    <div class="input">
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
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import CodeMirror from "./codeMirror.vue";

export default {
  name: "solve",
  mixins: [ApiMixin],
  components: {
    CodeMirror,
  },
  data() {
    return {
      problem: {},
      className: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    route() {
      let code = this.$refs.codeMirror.getCode();
      if (!this.className || this.className.includes(".java") || !code) {
        alert("Class name / code must not be empty and not include .java");
      } else {
        let body = {
          submissionText: code,
          className: this.className,
          user_id: "Bryan",
          problem_id: this.$route.params.id,
        };
        this.postData(
          "http://localhost:3013/rest/submission",
          "POST",
          body
        ).then((data) => {
          // Route to submisison page with id
          this.$router.push({ name: "Submission", params: { id: data.id } });
        });
      }
    },
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
.input {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.textInput {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.enterText {
  width: 70%;
}

.btn {
  margin: 10px;
}

.buttons-wrapper {
  width: fit-content;
  margin-left: auto;
}
</style>
