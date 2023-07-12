<template>
  <div class="story-container">
    <div class="d-flex justify-content-between user-story-list__header">
      <h2 class="story-title">Bookmark</h2>
    </div>

    <!-- Component -->
    <div>
      <story-list
        :stories="stories"
        :isBookmark="true"
        v-if="stories.length !== 0"
      ></story-list>
      <div class="empty-data" v-else>
        <img src="/images/empty-data.svg" alt="" class="empty-data__img" />
        <h2 class="empty-data__text">No data found</h2>
      </div>
    </div>
  </div>
</template>

<script>
import StoryList from "@/components/story/StoryList.vue";
export default {
  layout: "user",
  components: {
    StoryList,
  },
  computed: {
    stories() {
      console.log("story", this.$store.getters["story/getBookmarkList"]);
      return this.$store.getters["story/getBookmarkList"];
    },
  },
};
</script>

<style scoped>
.story-title {
  font-size: 24px;
}

.empty-data__img {
  width: 20%;
  margin: 0 auto;
}

.empty-data__text {
  font-size: 24px;
  margin-top: 15px;
}

.empty-data {
  text-align: center;
}
</style>
