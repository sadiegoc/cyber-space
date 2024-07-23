<template>
    <div class="home">
        <UsersList @receiver="(rec) => receive(rec)"/>
        <DisplayChat :receiver="this.receiver"/>
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
            myself: {}
        }
    },
    methods: {
        async loadMyself () {
            this.myself = await JSON.parse(localStorage.getItem("user"));
            if (!this.myself)
                this.$router.push({ name: 'SignUp' });
            else this.$emit('username', this.myself.username);
        },
        receive (rec) {
            this.receiver = rec;
        }
    },
    mounted () {
        this.loadMyself()
    }
}
</script>
<style>
.home {
    width: 100%; height: 100%;
    display: flex; flex-direction: row;
}
</style>