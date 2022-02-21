<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Capstone Project</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="#navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-link nav-item" to="/">Home</router-link>
        <router-link class="nav-link nav-item" to="/about">About</router-link>
        <router-link class="nav-link nav-item" to="/classes">Classes</router-link>
        <router-link class="nav-link nav-item right" to="/login">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navBar",
};
</script>

<style>

.right {
  justify-content: fl;
}

</style>
