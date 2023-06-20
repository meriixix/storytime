<template>
    <main class="main-wrapper container-sm">
        <login-form></login-form>
    </main>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue"

export default {
    middleware:["auth"],
    components: {
        LoginForm
    }
}
</script>
