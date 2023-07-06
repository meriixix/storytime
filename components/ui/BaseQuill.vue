<template>
  <section class="container mb-3">
    <label for="" class="form-label">Content</label>
    <client-only>
      <quill-editor
        ref="editor"
        :options="editorOption"
        @change="onEditorChange($event)"
        :content="value"
      />
    </client-only>
    <span class="error-desc">{{ error[0] }}</span>
  </section>
</template>

<script>
export default {
  props: {
    error: { type: Array },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: "",
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      },
    };
  },
  methods: {
    onEditorChange(editor) {
      this.$emit("input", editor.html);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.container .quill-editor {
  max-height: 400px;
}

label {
  font-size: 14px;
}

.error-desc {
  color: red;
  font-size: 12.8px;
}
</style>