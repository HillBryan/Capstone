<template>
  <div class="container mt-2">
    <div class="header">
      <h1>Problems</h1>
    </div>
    <hr />
    <div class="problems">
      <card v-for="problem in problems" :key="problem._id" :problem="problem"></card>
    </div>
  </div>
</template>

<script>

import ApiMixin from '../mixins/api_mixin';
import card from '../components/problemCard.vue';

export default {
  name: 'Problems',
  components: { card },
  mixins: [ApiMixin],
  data: function() {
    return {
      problems: [],
    }
  },
  mounted() {
    this.postData('http://localhost:3013/rest/problem/class/', 'POST', { class_id:  this.$route.params.class})
      .then(data => {
        this.problems = data;
    });
  },
  methods: {}
    
}
</script>

<style>

</style>
