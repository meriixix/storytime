<template>
  <div class="mb-3">
    <label :for="identity" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :class="['form-control', 'rounded-0', { 'error-form': isError }]"
      :id="identity"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('input', $event.target.value)"
      @focus="checkError"
    />
    <span class="error-desc">{{ error[0] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, require: true },
    identity: { type: String, require: true },
    placeholder: { type: String, require: true },
    label: { type: String, require: true },
    error: { type: Array },
    value: "",
  },
  data() {
    return {
      erorrStatus: false,
    };
  },
  computed: {
    isError() {
      return this.error.length > 0;
    },
  },
  methods: {
    checkError() {
      this.erorrStatus = this.error.length > 0 ? true : false;
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border-color: black;
}

.error-form {
  border-color: red !important;
}

.error-form:focus {
  box-shadow: 0px 0px 0px 3px rgba(255, 119, 119, 0.45),
    25px 0px 20px -20px rgba(0, 0, 0, 0.45),
    0px 25px 20px -20px rgba(0, 0, 0, 0.45),
    -25px 0px 20px -20px rgba(0, 0, 0, 0.45);
}

label {
  font-size: 14px;
}

.error-desc {
  color: red;
  font-size: 12.8px;
}
</style>