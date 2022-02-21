<template>
  <div id="app">
    <navBar></navBar>
    <router-view/>
  </div>
</template>

<script>
  import navBar from './components/nav-bar.vue';

  export default {
    data() {
      return {};
    },
    components:  {
      navBar,
    },
  }

</script>


<style>

</style>
