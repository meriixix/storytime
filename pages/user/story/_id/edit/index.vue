<template>
  <div class="story-container">
    <div class="d-flex align-items-center user-story-list__header">
      <nuxt-link to="/user/story" tag="a" class="arrow-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
          />
        </svg>
      </nuxt-link>
      <h2 class="edit-story-text">Edit Story</h2>
    </div>
    <story-form :isEdit="true"></story-form>
  </div>
</template>

<script>
import StoryForm from "@/components/user/story/StoryForm.vue";
export default {
  layout: "user",
  components: {
    StoryForm,
  },
};
</script>

<style scoped>
.story-container {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.edit-story-list__header {
  margin-bottom: 30px;
}

.arrow-left {
  margin-right: 20px;
  color: black;
}

.arrow-left:hover {
  cursor: pointer;
}
</style>
