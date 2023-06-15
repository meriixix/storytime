<template>
  <main class="main-wrapper container-sm">
    <!-- {{ registerStatus }} -->
    <!-- <register-form></register-form> -->
    <component :is="registerStatus"></component>
  </main>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm.vue";
import RegistrationSuccess from "@/components/auth/RegistrationSuccess.vue"

export default {
  components: {
    RegisterForm,
    RegistrationSuccess
  },
  computed: {
    registerStatus() {
      const component = this.$store.getters["auth/getRegisterStatus"]
      return component ? 'registration-success' : 'register-form'
    }
  }
};
</script>

<style scoped>

</style>
