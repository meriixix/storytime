<template>
  <div>
    <!-- Profile Component -->
    <profile-component></profile-component>
    <!-- Password Component -->
    <password-component></password-component>
  </div>
</template>

<script>
import ProfileComponent from "@/components/user/profile/ProfileComponent.vue";
import PasswordComponent from "@/components/user/profile/PasswordComponent.vue";
export default {
  components: {
    ProfileComponent,
    PasswordComponent,
  },
};
</script>
