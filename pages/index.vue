<template>
  <main class="main-wrapper container-sm pt-0">
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
            @keyup.enter="searchStory"
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
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
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
        <div v-if="storyList.length == 0" class="empty-data">
          <img
            src="/images/empty-data.svg"
            alt="Empty Data"
            class="empty-data__img"
          />
          <p class="empty-data__desc">No data found</p>
        </div>
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
      sort: "newest",
    };
  },
  methods: {
    loadMore() {
      const { page } = this.$store.getters["story/getPagination"];
      this.$store.dispatch("story/fetchStoryList", {
        page: page + 1,
        keyword: this.keyword,
        sort: this.sort,
      });
    },
    searchStory() {
      this.$store.dispatch("story/fetchStoryList", {
        keyword: this.keyword,
        sort: this.sort,
      });
    },
  },
  computed: {
    pageStatus() {
      const { total } = this.$store.getters["story/getPagination"];
      const stories = this.$store.getters["story/getStories"];
      return total == stories.length;
    },
    storyList() {
      return this.$store.getters["story/getStories"];
    },
  },
  async fetch() {
    await this.$store.dispatch("story/fetchStoryList");
  },
};
</script>

<style scoped>
.home-hero {
  display: flex;
  text-align: center;
  height: 100vh;
  align-items: center;
}

.home-hero .title {
  font-size: 52px;
  font-weight: 500;
}

.home-hero h1 {
  font-size: 32px;
  font-weight: 400;
}

.home-hero p {
  font-size: 32px;
}

.btn.load-more:hover {
  background-color: white;
  color: black;
}

.btn.btn-search:focus {
  box-shadow: none;
}

.btn.load-more:focus {
  box-shadow: none;
}

.btn.load-more {
  width: 130px;
  font-weight: 500;
}

.form-control:focus,
.form-select:focus {
  box-shadow: none;
  border-color: black;
}

.form-select {
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    right 0.75rem center/8px 10px no-repeat;
}

.btn.btn-search:hover {
  background-color: black;
}

.btn.btn-search {
  background-color: #0e0e0e;
}

.btn-search {
  background-color: black;
}

.empty-data {
  text-align: center;
}

.empty-data__desc {
  font-weight: 500;
  font-size: 24px;
  margin-top: 14px;
}

.empty-data__img {
  width: 40%;
}
</style>
