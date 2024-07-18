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
            receiver: ""
        }
    },
    methods: {
        loadData () {
            if (!JSON.parse(localStorage.getItem("user")))
                this.$router.push({ name: 'SignUp' });
        },
        receive (rec) {
            this.receiver = rec;
        }
    },
    mounted () {
        this.loadData();
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