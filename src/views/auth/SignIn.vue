<template>
    <div class="sign">
        <div class="sign-title">
            <h1>Sign In</h1>
        </div>
        <div class="form">
            <div class="container">
                <input type="text" v-model="user.username" placeholder="Enter your username"/>
                <input type="password" v-model="user.password" placeholder="Enter your password"/>
                <button v-on:click="signIn">Sign In</button>
                <p>
                    <router-link class="sign-link" to="/sign-up">Sign Up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SignIn',
    data () {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        signIn () {
            console.log(`username: ${this.user.username}`);
            console.log(`password: ${this.user.password}`);
        }
    }
}
</script>
<style>
.sign {
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
}
</style>