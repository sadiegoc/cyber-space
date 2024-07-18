<template>
    <div class="users-list">
        <div class="offcanvas-lg offcanvas-start offcanvas-bg-dark" id="users-list" aria-labelledby="usersList" tabindex="-1">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="usersList">Friends</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" data-bs-target="#users-list" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="list-group">
                    <a class="list-group-item list-group-item-action" v-for="u in users" :key="u.username" @click="selectChat(u.username)">
                        {{ u.name + '/@' + u.username }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import usersService from '@/services/users.service';

export default {
    name: 'UsersList',
    props: ['myself'],
    data () {
        return {
            users: []
        }
    },methods: {
        loadUsers () {
            usersService.get().then(response => {
                this.users = response.data.filter(user => user.username != this.myself);
            });
        },
        selectChat (rec) {
            this.$emit('receiver', rec);
        }
    },
    mounted () {
        this.loadUsers();
    }
}
</script>
<style>
#users-list {
    background-color: #161616 !important; color: white;
    width: 350px; height: 100%;
}

.btn-close {
    opacity: 1; color: white;
}

.list-group a {
    background-color: #191919;
    border: none; color: white;
    cursor: pointer;
}

.list-group a:hover {
    background-color: #252525;
    color: white;
}

@media (min-width: 992px) {
    #users-list {
        height: calc(100vh - 60px);
    }
}
</style>