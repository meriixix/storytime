<template>
  <user-profile></user-profile>
</template>

<script>
// import UserNavigation from "@/components/user/UserNavigation.vue"
import UserProfile from "@/components/user/profile/UserProfile.vue";
export default {
  layout: "user",
  middleware: ["checkAuth"],
  components: {
    // UserNavigation,
    UserProfile,
  },
};
</script>

<style scoped>
</style>