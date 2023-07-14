<template>
  <div class="toast-container">
    <div class="toast" role="alert" id="erorrToast">
      <div class="toast-header">
        <strong class="me-auto">Failed</strong>
        <button
          type="button"
          class="btn-close"
          @click="closeToast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getShowErrorToast"])
  },
  methods: {
    ...mapMutations(["setErrorToast"]),
    closeToast() {
      new bootstrap.Toast("#erorrToast").hide();
      this.setErrorToast({ status: false, message: "" });
    },
  },
  mounted() {
    const showToast = this.getShowErrorToast;
    if (showToast.status) {
      this.message = showToast.message;
      new bootstrap.Toast("#erorrToast").show();
      setTimeout(() => {
        this.setErrorToast({ status: false, message: "" });
        this.message = "";
      }, 5000);
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
  border-color: rgba(255, 119, 119, 0.889);
  background-color: rgba(255, 255, 255);
}

.toast-header {
  background-color: rgba(236, 189, 189, 0.794);
  color: rgb(128, 3, 3);
  border-bottom: 1px solid rgba(255, 119, 119, 0.889);
}

.toast-body {
  color: rgb(128, 3, 3);
  background-color: rgba(236, 189, 189, 0.256);
}

.btn-close:focus {
  box-shadow: none;
}
</style>