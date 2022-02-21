<template>
  <div class="container column">
    <!-- Div for picture content -->
    <div class="top">
      <p>top</p>
    </div>

    <hr/>

    <!-- Div for features -->
    <div class="bottom">
      <h3 class="text-center">Core Features</h3>

      <div class="row">
        <div class="m-auto">Feature 1</div>
        <div class="m-auto">Feature 2</div>
        <div class="m-auto">Feature 3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style>

.column {
  flex-direction: column;
}

.top {
  width: 100%;
}

.bottom {
  width: 100%;
  
}

</style>
