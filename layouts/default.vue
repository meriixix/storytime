<template>
  <div>
    <web-header></web-header>
    <Nuxt />
    <web-footer></web-footer>
  </div>
</template>

<script>
import WebHeader from "@/components/header/WebHeader.vue";
import WebFooter from "@/components/footer/WebFooter.vue";

export default {
  components: {
    WebHeader,
    WebFooter
  },
};
</script>
