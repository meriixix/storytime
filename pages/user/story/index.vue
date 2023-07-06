<template>
  <div class="story-container">
    <div
      class="d-flex justify-content-between user-story-list__header"
    >
      <div>
        <h2 class="story-title">Story List</h2>
      </div>
      <div>
        <nuxt-link
          tag="button"
          to="/user/story/create"
          class="btn btn-add-story shadow-none"
        >
          + Create Story
        </nuxt-link>
      </div>
    </div>

    <!-- Component -->
    <story-list></story-list>
    <base-success-toast
      message="Successfully create story"
      :isToastShow="showToast"
    ></base-success-toast>
  </div>
</template>

<script>
import StoryList from "@/components/user/story/StoryList.vue";
import BaseSuccessToast from "@/components/ui/BaseSuccessToast.vue";
export default {
  layout: "user",
  components: {
    StoryList,
    BaseSuccessToast,
  },
  data() {
    return {
      showToast: false,
    };
  },
  mounted() {
    this.showToast = this.$store.getters["story/getIsNewStoryAdded"];
  },
  watch: {
    showToast(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.$store.commit("story/setIsNewStoryAdded", false)
          this.showToast = false
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.story-container {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.story-title {
  font-size: 24px;
}

.btn {
  border-radius: 0;
  font-weight: 500;
}

.btn-add-story {
  color: white;
  background-color: black;
  font-size: 14px;
}

.create-story-text {
  margin-bottom: 0px;
  font-size: 24px;
}

.user-story-list__header {
  margin-bottom: 30px;
}
</style>