<template>
    <div>
        Cyber Space page
    </div>
</template>
<script>
export default {
    name: 'CyberSpace',
    data () {
        return {
            user: {}
        }
    },
    methods: {
        loadData () {
            this.user = localStorage.getItem("user");
            if (!this.user)
                this.$router.push({ name: 'SignUp' });
        }
    },
    mounted () {
        this.loadData();
    }
}
</script>
<style>
    
</style>