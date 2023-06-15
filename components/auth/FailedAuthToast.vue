<template>
  <div class="toast-container toast-dismissible">
    <div
      :class="['toast', { 'show': isToastShow, 'hide': !isToastShow }]"
      role="alert"
    >
      <div class="toast-header">
        <strong class="me-auto">Failed</strong>
        <button type="button" class="btn-close" @click="$emit('closeToast')"></button>
      </div>
      <div class="toast-body">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isToastShow: { type: Boolean, require: true },
    errorMessage: { type: String, require: true },
  },
  watch: {
    isToastShow(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.isToastShow = false;
        }, 2000);
      }
    },
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