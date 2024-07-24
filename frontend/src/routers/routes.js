import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";
import HomePage from "@/views/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import AboutUs from "@/views/AboutUs.vue";
import ProfileView from "@/views/ProfileView.vue";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    }, {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }, {
        path: '/about',
        name: 'AboutUs',
        component: AboutUs
    }, {
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;