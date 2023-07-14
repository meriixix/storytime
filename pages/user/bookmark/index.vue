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
        @deleteBookmark="getStory(1)"
      ></story-list>
      <div class="empty-data" v-else>
        <img src="/images/empty-data.svg" alt="" class="empty-data__img" />
        <h2 class="empty-data__text">No data found</h2>
      </div>

      <ul class="pagination justify-content-end mt-3" v-if="pageCount > 1">
        <li :class="['page-item', { disabled: currentPage == 1 }]">
          <button
            class="page-link page-item__button"
            href="#"
            tabindex="-1"
            @click="previousPage"
          >
            ‹
          </button>
        </li>
        <li class="page-item" v-for="page in pageCount" :key="page">
          <button
            :class="[
              'page-link page-item__number',
              { active: page == currentPage },
            ]"
            href="#"
            @click="getStory(page)"
          >
            {{ page }}
          </button>
        </li>
        <li :class="['page-item', { disabled: currentPage == pageCount }]">
          <button
            class="page-link page-item__button"
            href="#"
            @click="nextPage"
          >
            ›
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StoryList from "@/components/story/StoryList.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  layout: "user",
  components: {
    StoryList,
  },
  data() {
    return {
      stories: [],
      pageCount: 0,
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters("story", ["getBookmarkList"]),
  },
  methods: {
    ...mapMutations("story", ["setBookmark"]),
    getStory(page) {
      this.currentPage = page;
      const allStories = this.getBookmarkList;
      const startIndex = page == 1 ? 0 : (page - 1) * 6;
      const pageStories = allStories.slice(startIndex, startIndex + 6);
      this.stories = pageStories;
      const storiesMod = allStories.length % 6;
      this.pageCount =
        storiesMod == 0
          ? (allStories.length - storiesMod) / 6
          : (allStories.length - storiesMod) / 6 + 1;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      this.getStory(nextPage);
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      this.getStory(previousPage);
    },
  },
  mounted() {
    this.setBookmark();
    this.getStory(1);
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

/* Pagination */
.page-link:hover {
  text-decoration: none;
}

.page-link {
  color: black;
}

.page-link:active,
.page-link:focus {
  box-shadow: 0 0 0 0.2rem rgba(14, 14, 14, 0.25);
}

.page-link.active {
  z-index: 3;
  background-color: black;
  color: white;
  border-color: black;
}
</style>
