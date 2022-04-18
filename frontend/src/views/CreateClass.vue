<template>
  <div class="container">
    <div class="header text-center mt-2">
      <h1>Create Course</h1>
      <hr />
    </div>
    <div class="code">
      <h5>Course Name:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Name..."
        v-model="courseName"
      />
      <hr />

      <h5>Course Code:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Code..."
        v-model="courseCode"
      />
      <hr />

      <h5>Course Instructor:</h5>
      <input
        type="text"
        class="form-control"
        id="courseNameInput"
        placeholder="Course Instructor..."
        v-model="courseInstructor"
      />
      <hr />
      <div class="buttons-wrapper">
        <button type="button" class="btn btn-secondary mr-2" @click="goBack()">
          Back
        </button>
        <button type="button" class="btn btn-primary mr-0" @click="submit()">
          Create
        </button>
      </div>
    </div>
    <div class="grading"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApiMixin from "../mixins/api_mixin";

export default {
  name: "CreateClass",
  components: {},
  mixins: [ApiMixin],
  data() {
    return {
      courseName: "",
      courseCode: "",
      courseInstructor: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      let secret = this.makeid(5);
      this.postData("http://localhost:3013/rest/class/", "POST", {
        name: this.courseName,
        code: this.courseCode,
        instructor: this.courseInstructor,
        creator_id: this.account._id,
        course_secret: secret,
      }).then((data) => {
        console.log(data);
        this.postData("http://localhost:3013/rest/user/", "POST", {
          account_id: this.account._id,
          course_id: data._id,
        }).then(() => {
          this.goBack();
        });
      });
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
  computed: {
    ...mapGetters(["account"]),
  },
};
</script>

<style scoped>
.buttons-wrapper {
  width: fit-content;
  margin-left: auto;
}
</style>
