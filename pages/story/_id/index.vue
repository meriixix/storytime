<template>
  <main class="main-wrapper">
    <div class="detail-container container-sm">
      <div class="row justify-content-center">
        <div class="col-8">
          <div>
            <h3>{{ story.title }}</h3>
            <p>{{ getDate(story.createdAt) }}</p>
            <div class="detail-image">
              <img
                :src="story.story_image"
                :alt="story.title"
                class="img-fluid"
              />
            </div>
            <div v-html="story.content"></div>
          </div>
        </div>
        <div class="col-4">
          <div class="story-aside text-center shadow-sm p-3 bg-white">
            <h2>Author</h2>
            <div class="story-aside__author">
              <img
                :src="`https://storytime-api.strapi.timedoor-js.web.id${story.profile_picture}`"
                :alt="story.name"
                class="author-avatar img-fluid rounded-circle"
              />
              <h2>{{ story.name }}</h2>
              <p>
                {{ story.biodata }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      story: { },
    };
  },
  async fetch() {
    await this.$store.dispatch("story/fetchDetailStory", this.$route.params.id);
    this.story = this.$store.getters["story/getDetailStory"];
  },
  methods: {
    getDate(arg) {
      const date = new Date(arg);
      const month = date.toLocaleDateString("default", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },
};
</script>

<style scoped>
.detail-image {
    margin: 20px 0px;
    position: relative;
}

.detail-image img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.story-aside {
    position: sticky;
    top: 7rem;
}

.author-avatar {
    width: 70px;
    height: 70px;
}

.detail-container {
    padding-top: 22px;
}
</style>