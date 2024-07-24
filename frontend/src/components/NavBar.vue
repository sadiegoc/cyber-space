<template>
    <nav class="navbar navbar-expand navbar-dark justify-content-between">
        <div class="container-fluid">
            <button v-if="username" class="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#users-list" aria-controls="users-list">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="navbar" aria-labelledby="navbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Menu</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" data-bs-target="#navbar" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-if="username">
                            <router-link to="/home" class="nav-link">Home</router-link>
                        </li>
                        <li class="nav-item" v-if="username">
                            <router-link to="/profile" class="nav-link">Profile</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link">About us</router-link>
                        </li>
                        <li class="nav-item" v-if="username">
                            <a @click="logout" class="nav-link">Logout</a>
                        </li>
                        <li class="nav-item" v-if="!username">
                            <router-link to="/sign-up" class="nav-link">Sign Up</router-link>
                        </li>
                        <li class="nav-item" v-if="!username">
                            <router-link to="/sign-in" class="nav-link">Sign In</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav-user d-flex" v-if="username">
                <router-link class="nav-link" to="/profile">{{ username }}</router-link>
            </div>
            <button class="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar" aria-controls="navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    props: ['username'],
    methods: {
        logout () {
            localStorage.clear();
            this.$router.push({ name: 'SignIn' });
        }
    }
}
</script>
<style>
.navbar {
    background-color: #111; height: 60px;
    color: white;
}

.offcanvas-lg {
    background-color: #161616;
    color: white;
}

.navbar .nav-link {
    color: white; cursor: pointer;
}

.navbar .nav-link:hover {
    color: #DC7633;
}

.nav-user {
    font-size: 1.3rem;
}

.offcanvas-body {
    background-color: #111;
}

@media (max-width: 992px) {
    .navbar-nav {
        display: block;
    }
}
</style>