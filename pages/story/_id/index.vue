<template>
  <main class="main-wrapper">
    <div class="detail-container container-sm">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="story">
            <h3 class="story__title">{{ story.title }}</h3>
            <p class="story__date">{{ getDate(story.createdAt) }}</p>
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
          <div class="story-aside text-center bg-white">
            <h2 class="story-aside__title">Author</h2>
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

.story__date {
  color: #8f8f8f;
  font-size: 14px;
}

.story__title {
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0 10px;
}

.story-aside {
    padding: 20px;
    position: sticky;
    top: 7rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
}

.author-avatar {
    width: 70px;
    height: 70px;
    margin: 14px auto;
}

.detail-container {
    padding-top: 22px;
}

.story-aside__title {
  font-size: 16px;
  color: #8f8f8f;
  font-weight: 400;
}

.story-aside__author h2 {
  font-size: 16px;
  font-weight: 500;
  margin: 10px auto;
}

.story-aside__author p {
  font-size: 14px;
  color: #8f8f8f;
}
</style>