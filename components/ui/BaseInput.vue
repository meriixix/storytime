<template>
  <div class="mb-3">
    <label :for="identity" class="form-label">
      {{ label }}
      <div class="image-selector mt-3" v-if="type == 'file'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20z"
          />
        </svg>
        <span class="image-select-text">Add Image</span>
      </div>
    </label>
    <input
      :type="type"
      accept=".jpg, .png, .jpeg"
      :class="[
        'form-control',
        'rounded-0',
        { 'error-form': isError, 'd-none': type == 'file' },
      ]"
      :id="identity"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('input', $event.target.value)"
      @change="$emit('onFileSelected', $event.target)"
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
    error: { type: Array, default: [] },
    disabled: { type: Boolean, default: false},
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
  display: block;
}

.image-selector {
  height: 300px;
  width: 300px;
  border-width: 2px;
  border-style: dashed;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-color: #ced4da;
}

.image-select-text {
  font-size: 16px;
}
</style>