<template>
  <main class="main-wrapper container-sm">
    <div class="home-hero">
      <div class="container">
        <div class="title">
          Welcome to <img src="/images/logo.svg" alt="Logo" height="60" />
        </div>
        <h1>The world's most-loved social storytelling platform.</h1>
        <p>
          Story time connects a global community of 90 million readers and
          writers through the power of story.
        </p>
      </div>
    </div>
    <!-- Search -->
    <div class="row justify-content-between mb-3">
      <div class="col-4">
        <div class="input-group mb-3">
          <input
            type="text"
            class="search-form form-control rounded-0"
            placeholder="Search Story..."
            v-model="keyword"
          />
          <button
            class="btn-search btn btn-outline-secondary rounded-0"
            type="button"
            id="button-addon2"
            @click="searchStory"
          >
            <i
              class="fa-sharp fa-solid fa-magnifying-glass"
              style="color: #ffffff"
            ></i>
          </button>
        </div>
      </div>
      <div class="col-3">
        <select
          class="form-select rounded-0"
          v-model="sort"
          @change="searchStory"
        >
          <option value="" disabled>Sort</option>
          <option value="newest">Newest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>

    <div>
      <story-list :stories="storyList"></story-list>
      <div class="d-flex justify-content-center my-3">
        <button
          type="button"
          class="load-more btn btn-outline-dark rounded-0"
          @click="loadMore"
          v-if="!pageStatus"
        >
          Load More
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import StoryList from "@/components/story/StoryList.vue";
export default {
  components: {
    StoryList,
  },
  data() {
    return {
      keyword: "",
      sort: "",
    };
  },
  methods: {
    loadMore() {
      const { page } = this.$store.state.pagination;
      this.$store.dispatch("getStoryList", {
        page: page + 1,
        keyword: this.keyword,
        sort: this.sort,
      });
    },
    searchStory() {
      this.$store.dispatch("getStoryList", {
        keyword: this.keyword,
        sort: this.sort,
      });
    },
  },
  computed: {
    pageStatus() {
      const pagination = this.$store.state.pagination;
      return pagination.page == pagination.pageCount;
    },
    storyList() {
      return this.$store.state.stories;
    },
  },
  async created() {
    await this.$store.dispatch("getStoryList");
  },
};
</script>
