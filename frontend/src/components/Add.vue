<template>
  <div>
    <Navigation />
    <div class="container">
      <div class="mt-5">
        <form onsubmit="return false">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name">Név</label>
              <input type="text" class="form-control" v-model="formInput.name" autofocus required />
            </div>
            <div class="form-group col-md-6">
              <label for="ssn">TAJ szám</label>
              <input type="text" pattern="[0-9]{9}" class="form-control" v-model="formInput.ssn" required />
            </div>
          </div>
          <div class="form-group">
            <label for="address">Cím</label>
            <input type="text" class="form-control" v-model="formInput.address" required />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="city">Város</label>
              <input type="text" class="form-control" v-model="formInput.city" required />
            </div>
          </div>
          <button class="btn btn-primary" v-on:click="registerNewSick">Mentés</button>
        </form>
      </div>
    </div>
    <h3 class="jumbotron" v-if='this.$data.response !== ""'>{{ response }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "./Navigation.vue"

export default {
  name: "Home",
  components: {
    Navigation
  },
  data() {
    return {
      response: "",
      formInput: {
        name: "",
        ssn: "",
        address: "",
        city: ""
      },
    };
  },
  //, {params: this.axiosParams} PARAM after url

  mounted() {},
  methods: {
    registerNewSick: function() {
      if (!this.validateForm()) return;
      axios({
        method: "post",
        url: "http://localhost:3000/sicks",
        data: this.$data.formInput,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          console.log(result);
          this.$data.response = result.data;
          alert("A beteg adatai sikeresen mentve lettek!");
          location.reload();
        },
        error => {
          console.error(error);
          this.$data.response = error.response.data;
        }
      );
    },
    validateForm: function() {
      const formInput = this.$data.formInput;
      const regex = /^\d{9}$/;
      if (
        formInput.name.trim() === "" ||
        formInput.ssn.trim() === "" ||
        formInput.address.trim() === "" ||
        formInput.city.trim() === ""
      ) {
        return false;
      }
      else if (!this.$data.formInput.ssn.match(regex)){
        alert("Hibás TAJ szám formátum. Példa helyes formátumra: 123456789");
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
h3 {
  margin-top: 2rem;
  text-align: center;
}
</style>