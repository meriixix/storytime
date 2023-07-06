<template>
  <div class="mb-3">
    <label :for="identity" class="form-label">{{ label }}</label>
    <select :class="['form-select shadow-none', {'error-form': isError}]" :id="identity" @input="$emit('input', $event.target.value)">
      <option selected disabled>Select a category</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <span class="error-desc">{{ error[0] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    identity: { type: String, require: true },
    label: { type: String, require: true },
    error: { type: Array },
    value: "",
    options: { type: Array, require: true },
  },
  computed: {
    isError() {
      return this.error.length > 0;
    },
  },
};
</script>

<style scoped>
.form-select {
  border-radius: 0px;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    right 0.75rem center/8px 10px no-repeat;
}

.form-select:focus {
  border-color: black;
}

label {
  font-size: 14px;
}

.error-desc {
  color: red;
  font-size: 12.8px;
  display: block;
}

.error-form {
  border-color: red !important;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") right .75rem center/8px 10px no-repeat,#fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ff3535'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23ff3535' stroke='none'/%3E%3C/svg%3E") center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem) no-repeat !important;
}

.form-select.error-form:focus {
  box-shadow: 0px 0px 0px 3px rgba(255, 119, 119, 0.45),
    25px 0px 20px -20px rgba(0, 0, 0, 0.45),
    0px 25px 20px -20px rgba(0, 0, 0, 0.45),
    -25px 0px 20px -20px rgba(0, 0, 0, 0.45)!important;
    /* background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") right .75rem center/8px 10px no-repeat,#fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ff3535'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23ff3535' stroke='none'/%3E%3C/svg%3E") center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem) no-repeat !important; */
}
</style>