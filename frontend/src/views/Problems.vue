<template>
  <div class="container mt-2">
    <div v-if="spinner" class="spinner-border spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!spinner" class="header flex-row">
      <h1>Problems</h1>
      <button
        v-if="!enrolled"
        type="button"
        class="btn btn-secondary ml-auto"
        @click="route()"
      >
        Create Problem
      </button>
    </div>
    <hr />
    <div v-if="!spinner" class="problems">
      <card
        v-for="problem in problems"
        :key="problem._id"
        :problem="problem"
        :enrolled="enrolled"
      ></card>
    </div>
  </div>
</template>

<script>
import ApiMixin from "../mixins/api_mixin";
import card from "../components/problemCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "Problems",
  components: { card },
  mixins: [ApiMixin],
  data: function () {
    return {
      problems: [],
      spinner: true,
      enrolled: true,
    };
  },
  methods: {
    route() {
      this.$router.push({
        name: "CreateProblem",
        params: { class: this.$route.params.class },
      });
    },
  },
  computed: {
    ...mapGetters(["account"]),
  },
  mounted() {
    this.postData("http://localhost:3013/rest/problem/class/", "POST", {
      class_id: this.$route.params.class,
    }).then((data) => {
      if (data.length > 0) {
        this.enrolled = this.account._id !== data[0].creator_id;
      }
      this.problems = data;
      this.spinner = false;
    });
  },
};
</script>

<style scoped>
.spinner {
  margin-left: 50%;
  zoom: 200%;
}

.flex-row {
  display: flex;
  flex-direction: row;
}
</style>
