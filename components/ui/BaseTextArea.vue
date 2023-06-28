<template>
  <div class="mb-">
    <label :for="identity" class="form-label">{{ label }}</label>
    <textarea
      class="form-control"
      id="identity"
      rows="4"
      placeholder="Enter about me"
      @input="$emit('input', $event.target.value)"
      :value="value"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    identity: { type: String, require: true },
    label: { type: String, require: true },
    value: ""
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: none;
  border-color: black;
}

.form-control {
    border-radius: 0px;
}
</style>
