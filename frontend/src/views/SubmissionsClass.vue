<template>
  <div class="container">
    <div v-if="spinner" class="spinner-border spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!spinner" class="header">
      <h1 class="text-center mt-2">Submissions</h1>
      <hr />
    </div>
    <div v-if="!spinner" class="body">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Submission ID</th>
            <th>Problem</th>
            <th>Status</th>
            <th># Testcases Passed</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="m-row"
            v-for="(submission,index) in submissions"
            :key="submission._id"
          >
            <td>
              <span>{{ userNames[index] }}</span>
            </td>
            <td>
              <span class="a" @click="routeSubmission(submission._id)">{{
                submission._id
              }}</span>
            </td>
            <td>
              <span class="a" @click="routeProblem(submission.problem_id)">{{
                submission.problem_name
              }}</span>
            </td>
            <td>{{ submission.status }}</td>
            <td>{{ submission.passed }} / {{ submission.total }}</td>
            <td>{{ getLetter(submission.passed / submission.total) }}</td>
          </tr>
          <!-- and so on... -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import { mapGetters } from "vuex";

export default {
  name: "SubmissionsProblem",
  mixins: [ApiMixin],
  components: {},
  data() {
    return {
      spinner: true,
      submissions: [],
      userNames: [],
    };
  },
  methods: {
    getLetter(grade) {
      grade *= 100;
      if (grade >= 93) return "A";
      if (grade >= 90) return "A-";
      if (grade >= 87) return "B+";
      if (grade >= 85) return "B";
      if (grade >= 80) return "B-";
      if (grade >= 77) return "C+";
      if (grade >= 75) return "C";
      if (grade >= 70) return "C-";
      if (grade >= 67) return "D+";
      if (grade >= 65) return "D";
      if (grade >= 60) return "D-";
      return "F";
    },
    routeProblem(problem_id) {
      this.$router.push({ name: "Problem", params: { id: problem_id } });
    },
    routeSubmission(submission_id) {
      this.$router.push({ name: "Submission", params: { id: submission_id } });
    },
  },
  computed: {
    ...mapGetters(["account"]),
    getProblemLink(problem_id) {
      return "http://localhost:8080/problem/" + problem_id;
    },
  },
  mounted() {
    this.postData("http://localhost:3013/rest/submission/user", "POST", {
      user_id: this.account._id,
    }).then((data) => {
      let temp = [];
      data.forEach((submission) => {
        if (submission.problem_id === this.$route.params.id) {
          temp.push(submission);
        }
      });
      this.submissions = temp;
      this.submissions.forEach((submission) => {
        this.postData("http://localhost:3013/rest/account/id", "POST", {
          _id: submission.user_id,
        }).then((data) => {
          this.userNames.push(data[0].name)
        });
      });
    });
    this.spinner = false;
  },
};
</script>

<style scoped>
.spinner {
  margin-left: 50%;
  zoom: 200%;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  font-size: 1.1rem;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.m-row {
  padding-top: 1rem;
}

.styled-table thead tr {
  background-color: #343a3f;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #343a3f;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

.a {
  color: blue;
}

.a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.a:active {
  color: black;
}

.a:visited {
  color: purple;
}
</style>
