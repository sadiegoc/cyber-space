<template>
    <div class="users-list">
        <div class="offcanvas-lg offcanvas-start" id="users-list" aria-labelledby="usersList" tabindex="-1">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="usersList">Responsive offcanvas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#users-list" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p class="mb-0">This is a content</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UsersList'
}
</script>
<style>
#users-list {
    background-color: #161616 !important; color: white;
    width: 350px; height: 100%;
}

@media (min-width: 992px) {
    #users-list {
        height: calc(100vh - 60px);
    }
}
</style>