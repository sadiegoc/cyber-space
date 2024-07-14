import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";
import CyberSpace from "@/views/CyberSpace.vue";
import ChatComponent from '@/components/ChatComponent.vue'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'CyberSpace',
        component: CyberSpace
    }, {
        path: '/chat/:id',
        name: 'chat-component',
        component: ChatComponent
    }, {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    }, {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;