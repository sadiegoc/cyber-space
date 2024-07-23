<template>
  <div class="sign">
    <div class="container">
      <h1 class="mb-3 text-center text-white">Sign In</h1>
      <form @submit.prevent="signIn" class="mx-auto">
        <div class="mb-3 mx-3">
          <label for="form-email" class="form-label">E-mail</label>
          <input type="text" v-model="user.email" id="form-email" class="form-control shadow-none" placeholder="Enter your e-mail" maxlength="60"/>
        </div>
        <div class="mb-5 mx-3">
          <label for="form-password" class="form-label">Password</label>
          <input type="password" v-model="user.password" id="form-password" class="form-control shadow-none" placeholder="Enter your password"/>
        </div>
        <p class="mx-3">
          <button type="submit" class="btn-sign">Sign In</button>
        </p>
        <p class="mx-3 text-center sign-link">
          <router-link to="/sign-up">Sign Up</router-link>
        </p>
        <p v-if="error" class="form-text text-center">{{ error }}</p>
        <p v-if="empty" class="form-text text-center">{{ empty }}</p>
        <p v-if="emailLength" class="form-text text-center">{{ emailLength }}</p>
      </form>
    </div>
  </div>
</template>
<script>
import usersService from '@/services/users.service';

export default {
  name: 'SignIn',
  data () {
      return {
          user: {
              email: "",
              password: ""
          },
          error: "",
          empty: "",
          emailLength: ""
      }
  },
  methods: {
    signIn () {
      this.empty = this.isEmpty() ? "Fields cannot be empty." : "";
      this.emailLength = this.lessThan(this.user.email.length, 60) ? "The e-mail cannot be longer than 60 characters." : "";

      if (!this.empty && !this.emailLength) {
        usersService.login(this.user).then(response => {
            if (response.data[0])
              this.redirect(response.data[0]);
            else
              this.error = "E-mail or password are incorrects.";
          }).catch(err => {
            this.error = "Error connecting to the server.";
            console.warn(err);
          });
      }
    },
    async redirect (user) {
      await localStorage.setItem("user", JSON.stringify({ name: user.name, username: user.username }));
      this.$router.push({ name: 'HomePage' });
    },
    loadData () {
      if (localStorage.getItem("user"))
        this.$router.push({ name: 'HomePage' });
    },
    isEmpty () {
      if (!this.user.email || !this.user.password)
        return true;
      return false;
    },
    lessThan (value, size) {
      if (value <= size)
        return false;
      return true;
    }
  },
  async mounted () {
    await this.loadData();
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
  border: none; border-radius: 40px;
  height: 50px;
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