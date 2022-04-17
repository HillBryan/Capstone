<template>
  <textarea
    id="input"
    placeholder="Enter code here..."
    v-model="code"
  ></textarea>
</template>

<script>

import * as CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/mode/clike/clike.js'


export default {
  name: "CodeMirror",
  props: ["height", "width", "text", "disabled"],
  data() {
    return {
      code: "",
      codeMirror: null,
    };
  },
  methods: {
    changeLanguage(inputMode) {
      this.codeMirror = CodeMirror.fromTextArea(
        document.getElementById("input"),
        {
          lineNumbers: true,
          theme: 'ayu-dark',
          mode: inputMode,
          matchBrackets: true,
          autoCloseBrackets: true,
          readOnly: this.disabled,
        }
      );
    },
    getCode() {
        return this.codeMirror.getValue();
    },
    setValue(text) {
        this.codeMirror.setValue(text);
    }
  },
  mounted() {
    this.codeMirror = CodeMirror.fromTextArea(
      document.getElementById("input"),
      {
        lineNumbers: true,
        theme: "ayu-dark",
        mode: "text/x-java",
        matchBrackets: true,
        autoCloseBrackets: true,
        readOnly: this.disabled,
      }
    );

    this.codeMirror.setSize(this.height, this.width + 'rem');
    if (this.text) this.codeMirror.setValue(this.text);
  },
};
</script>

<style></style>
