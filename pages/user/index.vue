<template>
    <main class="main-wrapper container-sm mt-3">
        <div class="user-profile row">
            <!-- User Navigation -->
            <div class="col-3">
                <user-navigation></user-navigation>
            </div>
            <!-- User Detail -->
            <div class="col-9">
                <user-profile></user-profile>
            </div>
        </div>
    </main>
</template>

<script>
import UserNavigation from "@/components/user/UserNavigation.vue"
import UserProfile from "@/components/user/profile/UserProfile.vue"
export default {
    middleware: ["checkAuth"],
    components: {
        UserNavigation,
        UserProfile
    }
}
</script>

<style scoped>

</style>