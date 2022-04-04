<template>
  <div class="container">
    <div class="header">
      <h1 class="text-center mt-2">Solving: {{ this.problem.title }}</h1>
      <hr />
    </div>
    <div class="code">
      <textarea
        id="input"
        placeholder="Enter code here..."
        v-model="code"
      ></textarea>
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
import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/mode/clike/clike.js'

export default {
  name: "solve",
  mixins: [ApiMixin],
  data() {
    return {
      problem: {},
      code: "",
      className: "",
      codeMirror: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    route() {
        let code = this.codeMirror.getValue();
        if (!this.className || this.className.includes('.java') || !code) {
            alert("Class name / code must not be empty and not include .java");
        } else {
            let body = {
                submissionText: code,
                className: this.className,
                user_id: 'Bryan',
                problem_id: this.$route.params.id
            }
            this.postData("http://localhost:3013/rest/submission", "POST", body).then((data) => {
                // Route to submisison page with id
                this.$router.push({ name: 'Submission', params: { id: data.id } })
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

    this.codeMirror = CodeMirror.fromTextArea(document.getElementById('input'), {
      lineNumbers: true,
      theme: 'ayu-dark',
      mode: 'text/x-java',
      matchBrackets: true,
      autoCloseBrackets: true,
    });

    this.codeMirror.setSize(null, '25rem')
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
    display:flex;
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
