<template>
    <div class="users-list">
        <div class="offcanvas-lg offcanvas-start offcanvas-bg-dark" id="users-list" aria-labelledby="usersList" tabindex="-1">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="usersList">Friends</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" data-bs-target="#users-list" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="list-group">
                    <a class="list-group-item list-group-item-action" :class="{ active: active }" v-for="u in users" :key="u.username" @click="selectChat(u.username)">
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
            users: [],
            active: false
        }
    },methods: {
        loadUsers () {
            usersService.get().then(response => {
                this.users = response.data.filter(user => user.username != this.myself);
            });
        },
        selectChat (rec) {
            this.$emit('receiver', rec);
            this.active = true;
        }
    },
    mounted () {
        this.loadUsers();
    }
}
</script>
<style scoped>
#users-list {
    background-color: #161616 !important; color: white;
    width: 350px; height: 100%;
}

.btn-close {
    opacity: 1; color: white;
}

.offcanvas-body {
    height: 100%;
}

.list-group {
    width: 100%; padding: 10px;
}

.list-group a {
    background-color: #303030;
    border: none; color: white;
    cursor: pointer;
}

.list-group a.active {
    background-color: #DC7633;
}

.list-group a.active:hover {
    background-color: #D35400;
}

.list-group a:hover {
    background-color: #404040;
    color: white;
}

@media (max-width: 992px) {
    .offcanvas-body {
        padding: 0;
    }
}
</style>