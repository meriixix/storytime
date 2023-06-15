<template>
  <div class="mb-3">
    <label :for="identity" class="form-label">{{ label }}</label>
    <div :class="['input-group', { 'error-form': isError }]">
      <input
        :type="type"
        class="form-control"
        :placeholder="placeholder"
        :value="value"
        :name="identity"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('input', $event.target.value)"
      />
      <button type="button" class="btn" @click="$emit('passwordShow')">
        <i
          :class="[
            'fa-solid',
            { 'fa-eye': !isShowPassword, 'fa-eye-slash': isShowPassword },
          ]"
        ></i>
      </button>
    </div>
    <span class="error-desc">{{ error[0] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, require: true },
    identity: { type: String, require: true },
    placeholder: { type: String, require: true },
    type: { type: String, require: true },
    error: { type: Array },
    isShowPassword: { type: Boolean, require: true },
    value: "",
  },
  computed: {
    isError() {
      return this.error.length > 0;
    },
  },
};
</script>


<style scoped>
label {
  font-size: 14px;
}

.form-control:focus,
.btn:focus {
  box-shadow: none;
  border-color: none;
}

.error-desc {
  color: red;
  font-size: 12.8px;
}

.btn,
.form-control {
  border: none;
  border-radius: 0px;
}

.fa-eye,
.fa-eye-slash {
  color: rgb(143, 143, 143);
}

.input-group {
  border: 1px solid #ced4da;
}

.error-form {
  border: 1px solid red !important;
}

.error-form:focus-within {
  box-shadow: 0px 0px 0px 3px rgba(255, 119, 119, 0.45),
    25px 0px 20px -20px rgba(0, 0, 0, 0.45),
    0px 25px 20px -20px rgba(0, 0, 0, 0.45),
    -25px 0px 20px -20px rgba(0, 0, 0, 0.45);
}
</style>