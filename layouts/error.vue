<template>
  <div>
    <main class="main-wrapper container">
      <div class="error-container">
        <div class="row justify-content-center">
          <div class="col-7">
            <img src="/images/404.svg" alt="404" class="error_image" />
            <h1 class="error_title">An error has occured</h1>
            <div class="error_button">
              <nuxt-link to="/" tag="button" class="btn btn-primary"
                >Back To Home</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import WebHeader from "@/components/header/WebHeader.vue";
import WebFooter from "@/components/footer/WebFooter.vue";

export default {
  components: {
    WebHeader,
    WebFooter,
  },
};
</script>

<style scoped>
.error-container {
  padding-top: 22px;
}

.error_image {
  width: 100%;
}

.error_title {
  font-size: 40px;
  text-align: center;
  margin: 20px 0px;
}

.btn:hover {
  background-color: black;
}

.btn {
  border-radius: 0;
  padding: 7px 25px;
  font-weight: 500;
  transition: all 0.3 ease;
  border-color: black;
  background-color: #343434;
  color: white;
}

.error_button {
  text-align: center;
}
</style>
