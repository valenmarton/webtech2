<template>
  <div id="app">
    <router-link to="/login"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
      //components are rendered based on the router
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
a {
  text-decoration: none !important;
}
</style>
