<template>
  <div class="toast-container">
    <div
      class="toast"
      role="alert"
      id="liveToast"
    >
      <div class="toast-header">
        <strong class="me-auto">Success</strong>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeToast"
        ></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    }
  },
  methods: {
    closeToast() {
      new bootstrap.Toast("#liveToast").hide();
      this.$store.commit("setSuccessToast", {status: false, message: ""})
    }
  },
  mounted() {
    const showToast = this.$store.getters.getShowSuccessToast
    if ( showToast.status ) {
      this.message = showToast.message
      new bootstrap.Toast("#liveToast").show();
      setTimeout(() => {
        this.$store.commit("setSuccessToast", {status: false, message: ""})
        this.message = ""
      }, 5000)
    } 
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  z-index: 9999;
}

.toast {
  border-color: #badbcc;
  background-color: rgb(255, 255, 255);
}

.toast-header {
  color: #0f5132;
  background-color: #dcf6eb;
  border-color: #dcf6eb;
}

.toast-body {
  color: #0f5132;
  background-color: #ecfcf5;
  border-color: #badbcc;
}

.btn-close:focus {
  box-shadow: none;
}
</style>