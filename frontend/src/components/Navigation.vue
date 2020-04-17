<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Beteg-nyilvántartó</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/add">
            <a class="nav-link">Új beteg hozzáadása</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list">
            <a class="nav-link">Betegek listázása</a>
          </router-link>
        </li>
      </ul>
      <button class="btn btn-outline-primary my-2 my-sm-0" v-on:click="logOut">Kijelentkezés</button>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    logOut: function() {
      window.location.href = "/login";
    }
  }
};
</script>

<style>
</style>