<template>
  <div>
    <web-header></web-header>
    <main class="main-wrapper container-sm mt-3">
      <div class="user-profile row">
        <!-- User Navigation -->
        <div class="col-3">
          <user-navigation></user-navigation>
        </div>
        <!-- User Detail -->
        <div class="col-9">
          <Nuxt />
        </div>
      </div>
    </main>
    <web-footer></web-footer>
  </div>
</template>

<script>
import WebHeader from "@/components/header/WebHeader.vue";
import WebFooter from "@/components/footer/WebFooter.vue";
import UserNavigation from "@/components/user/UserNavigation.vue"

export default {
  components: {
    WebHeader,
    WebFooter,
    UserNavigation
  },
  mounted() {
    this.$store.commit("story/setBookmark")
  }
};
</script>
