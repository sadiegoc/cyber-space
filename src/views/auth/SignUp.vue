<template>
  <div class="sign">
    <div class="container">
      <h1 class="mb-3 text-center text-white">Sign Up</h1>
      <form @submit.prevent="signUp" class="mx-auto">
        <div class="mb-3 mx-3">
          <label for="form-name" class="form-label">Name</label>
          <input type="text" v-model="user.name" id="form-name" class="form-control shadow-none" placeholder="Enter your name"/>
        </div>
        <div class="mb-3 mx-3">
          <label for="form-email" class="form-label">E-mail</label>
          <input type="email" v-model="user.email" id="form-email" class="form-control shadow-none" placeholder="Enter your e-mail"/>
        </div>
        <div class="mb-3 mx-3">
          <label for="form-username" class="form-label">Username</label>
          <input type="text" v-model="user.username" id="form-username" class="form-control shadow-none" placeholder="Enter your username"/>
        </div>
        <div class="mb-5 mx-3">
          <label for="form-password" class="form-label">Password</label>
          <input type="password" v-model="user.password" id="form-password" class="form-control shadow-none" placeholder="Enter your password"/>
        </div>
        <p class="mx-3">
          <button type="submit" class="btn-sign">Sign Up</button>
        </p>
        <p class="mx-3 text-center sign-link">
          <router-link to="/sign-in">Sign In</router-link>
        </p>
        <p v-if="error" class="form-text text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
<script>
import usersService from '@/services/users.service';

export default {
  name: 'SignUp',
  data () {
      return {
          user: {
              name: "",
              email: "",
              username: "",
              password: ""
          },
          error: ""
      }
  },
  methods: {
    signUp () {
      if (this.user.name && this.user.email && this.user.username && this.user.password) {
        usersService.register(this.user)
          .then(response => {
            if (response.data.status == "error")
              this.error = response.data.message.email ? "This e-mail already exists." : "This username already exists.";
            else {
              this.redirect();
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    },
    async redirect () {
      await localStorage.setItem("user", JSON.stringify({ name: this.user.name, username: this.user.username }));
      this.$router.push({ name: 'HomePage' });
    },
    loadData () {
      if (localStorage.getItem("user"))
        this.$router.push({ name: 'HomePage' });
    }
  },
  async mounted () {
    await this.loadData();
    this.$emit('logged', false);
  }
}
</script>
<style>
form {
  max-width: 500px;
}

form .form-label {
  color: white;
}

form .form-control {
  border: none;
  border-radius: 40px; height: 50px;
}

form .btn-sign {
  height: 50px; width: 100%;
  border-radius: 50px; border: none;
  background-color: #DC7633;
  color: #fff; cursor: pointer;
  font-size: 1.4rem; text-transform: uppercase;
}

form .btn-sign:hover {
  background-color: #D35400;
}

.sign-link a {
  text-transform: uppercase; font-size: 1.2rem;
  color: white; text-decoration: none;
}

.sign-link a:hover {
  color: #DC7633;
}

.form-text {
  color: brown;
}
</style>