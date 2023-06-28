<template>
  <div class="toast-container toast-dismissible">
    <div
      :class="['toast', { show: isToastShow, hide: !isToastShow }]"
      role="alert"
    >
      <div class="toast-header">
        <strong class="me-auto">Failed</strong>
        <button
          type="button"
          class="btn-close"
          @click="$emit('closeToast')"
        ></button>
      </div>
      <div class="toast-body">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isToastShow: { type: Boolean, require: true },
    message: { type: String, require: true },
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
  background-color: #bed7cc;
  border-color: #badbcc;
}

.toast-body {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

.btn-close:focus {
  box-shadow: none;
}
</style>