<template>
  <div class="text-center">
			<h3 class="p-3 mb-2 text-danger">{{ response }}</h3>
			<!-- Prevent page refresh after submitting -->
    <form class="form-signin" onsubmit="return false">
      <h1 class="h3 mb-3 font-weight-normal">Kérem jelentkezzen be</h1>
			<!-- Autofocus on this field after the page is loaded -->
					<!-- type="email" for validating email format on submit -->
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email"
        required
        autofocus 
				v-model="formInput.email"
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
				v-model="formInput.password"
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="signIn">Belépés</button>
			<button class="btn btn-lg btn-secondary btn-block" type="submit" v-on:click="signUp">Regisztráció</button>
      <p class="mt-5 mb-3 text-muted">Márton Valentin &copy; 2020</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      response: "",
      formInput: {
        email: "",
        password: ""
      },
      validEmail: false
    };
  },
  //, {params: this.axiosParams} PARAM after url

  mounted() {},
  methods: {
    signUp: function() {
      if(!this.validateEmail()) return
      axios({
        method: "post",
        url: "http://localhost:3000/signup",
        data: this.$data.formInput,
        headers: { "content-type": "application/json" }
      }).then(
        result => {
          this.$data.response = result.data;
        },
        error => {
            console.error(error)
            this.$data.response = error.response.data
        }
      );
		},
		signIn: function() {
      if(!this.validateEmail()) return
			axios({
				method: "post",
        url: "http://localhost:3000/signin",
        data: this.$data.formInput,
        headers: { "content-type": "application/json" }
			}).then(
					result => {
          if(result.status === 200) {
            this.$data.response = result.data;
            window.location.href='/add'
          }
        },
        error => {
          console.error(error)
          this.$data.response = error.response.data
        }
      )
    },
    validateEmail: function() {
      const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
      return reg.test(this.$data.formInput.email)
    }
  }
};

</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>>
