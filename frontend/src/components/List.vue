<template>
  <div>
    <Navigation />
    <table class="table">
      <thead>
        <tr>
          <th>TAJ szám</th>
          <th>Név</th>
          <th>Cím</th>
          <th>Város</th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="user.ssn" v-for="user in users">
          <td>{{ user.ssn }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.city }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
import Navigation from "./Navigation.vue";

export default {
  components: {
    Navigation
  },
  data() {
    return {
      response: "",
      users: [],
      validEmail: false
    };
  },
  mounted() {
      this.getSicks()
  },
  methods: {
    getSicks: function() {
        axios({
        method: "get",
        url: "http://localhost:3000/sicks",
        headers: { "content-type": "application/json" }
        }).then(
            result => {
          if(result.status === 200) {
            this.$data.users = result.data;
          }
        },
        error => {
          console.error(error)
          this.$data.response = error.response.data
        }
      )
    },
    logOut: function() {
      window.location.href = "/login";
    },

  }
};
</script>

<style scoped>
    table {
        margin-top: 10rem;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    table th {
        background-color: rgb(209, 208, 208);
    }
</style>>
