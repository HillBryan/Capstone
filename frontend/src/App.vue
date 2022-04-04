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

#app {
  height: 100%;
  min-height: 100vh;
}

.container {
  min-height: 100vh;
}

</style>
