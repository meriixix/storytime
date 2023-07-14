<template>
  <user-profile></user-profile>
</template>

<script>
import UserProfile from "@/components/user/profile/UserProfile.vue";
export default {
  layout: "user",
  middleware: ["checkAuth"],
  components: {
    UserProfile,
  },
};
</script>

<style scoped>
</style>