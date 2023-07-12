<template>
  <div class="row gy-4">
    <div
      :class="{ 'col-3': !isBookmark, 'col-4': isBookmark }"
      v-for="story in stories"
      :key="story.id"
    >
      <story-item :story="story" @bookmarkClick="showSuccessToast" @errorBookmark="showErrorToast"></story-item>
    </div>
    <base-success-toast v-if="isSuccessToastShow"></base-success-toast>
    <base-error-toast v-if="isErrorToastShow"></base-error-toast>
  </div>
</template>

<script>
import StoryItem from "./StoryItem.vue";
import BaseSuccessToast from "../ui/BaseSuccessToast.vue"
import BaseErrorToast from "../ui/BaseErrorToast.vue"
export default {
  components: {
    StoryItem,
    BaseSuccessToast,
    BaseErrorToast
  },
  props: {
    stories: { type: Array, require: true },
    isBookmark: { type: Boolean, require: true, default: false },
  },
  data() {
    return {
      isSuccessToastShow: false,
      isErrorToastShow: false
    }
  },
  methods: {
    showSuccessToast() {
      this.isSuccessToastShow = true
    },
    showErrorToast() {
      this.isErrorToastShow = true
    }
  },
  watch: {
    isSuccessToastShow(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.isSuccessToastShow = false;
        }, 5000);
      }
    },
    isErrorToastShow(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.isErrorToastShow = false;
        }, 5000);
      }
    }
  }
};
</script>