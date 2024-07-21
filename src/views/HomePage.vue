<template>
    <div class="home">
        <UsersList @receiver="(rec) => receive(rec)" :notification="this.notification"/>
        <DisplayChat @notify="(not) => notify(not)" :receiver="this.receiver"/>
    </div>
</template>
<script>
import UsersList from '@/components/UsersList.vue';
import DisplayChat from '@/components/DisplayChat.vue';

export default {
    name: 'HomePage',
    components: {
        UsersList,
        DisplayChat
    },
    data () {
        return {
            receiver: "",
            notification: "",
            myself: {}
        }
    },
    methods: {
        async loadMyself () {
            this.myself = await JSON.parse(localStorage.getItem("user"));
            if (!this.myself)
                this.$router.push({ name: 'SignUp' });
        },
        receive (rec) {
            this.receiver = rec;
        },
        notify (not) {
            this.notification = not;
        }
    },
    mounted () {
        this.loadMyself();
        this.$emit('logged', true);
    }
}
</script>
<style>
.home {
    width: 100%; height: 100%;
    display: flex; flex-direction: row;
}
</style>