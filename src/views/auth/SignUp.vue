<template>
  <div class="sign">
    <nav class="navbar navbar-expand mb-3">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sign-up" class="nav-link">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sign-in" class="nav-link">Sign In</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <h1 class="mb-3 text-center text-white">Sign Up</h1>
      <form @submit.prevent="signUp" class="mx-auto">
        <div class="mb-3 mx-3">
          <label for="form-name" class="form-label">Name</label>
          <input type="text" v-model="user.name" id="form-name" class="form-control shadow-none" placeholder="Enter your name"/>
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
        <p v-if="error" class="form-text text-center">This username already exists!</p>
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
              username: "",
              password: ""
          },
          error: false
      }
  },
  methods: {
    signUp () {
      if (this.user.name && this.user.username && this.user.password) {
        usersService.register(this.user)
          .then(response => {
            if (response.data.message == "username")
              this.error = true;
            else {
              this.redirect();
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    },
    redirect () {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$router.push({ name: 'CyberSpace' });
    },
    loadData () {
      if (localStorage.getItem("user"))
        this.$router.push({ name: 'CyberSpace' });
    }
  },
  mounted () {
    this.loadData();
  }
}
</script>
<style>
.sign {
  width: 100vw; height: 100vh;
  background-color: #111;
}

.navbar {
  background-color: #111;
}

.navbar .nav-link {
  color: white;
}

.navbar .nav-link:hover {
  color: #DC7633;
}

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
/* .sign {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: rgba(0, 0, 0, 0.9); color: white;
  text-align: center; height: 100%; width: 100%;
}

.sign .sign-title {
  margin: auto; padding: 40px;
  font-size: 1.5rem;
}

.form {
  width: 100%; height: 400px;
  display: flex; align-items: center;
}

.form .container {
  margin: auto;
}

.form input {
    width: 450px; height: 50px;
    padding-left: 20px; display: block;
    margin: auto auto 30px auto;
    border-radius: 50px; border: none;
}

.form button {
    width: 470px; height: 50px;
    border-radius: 50px; border: none;
    background-color: #DC7633;
    color: #fff; cursor: pointer;
    margin-bottom: 30px;
    font-size: 1.4rem; text-transform: uppercase;
}

.form button:hover {
  background-color: #D35400;
}

.form .sign-link {
  text-decoration: none;
  color: white; font-size: 1.4rem;
  text-transform: uppercase;
}

.form .sign-link:hover {
  color: #D35400; text-decoration: underline;
} */
</style>