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
                :src="setImage(story)"
                :alt="story.title"
                class="img-fluid"
              />
            </div>
            <div>
              <p v-html="story.content"></p>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="story-aside text-center shadow-sm p-3 bg-white">
            <h2>Author</h2>
            <div class="story-aside__author">
              <img
                :src="`https://storytime-api.strapi.timedoor-js.web.id${story.author.profile_picture.url}`"
                :alt="story.author.name"
                class="author-avatar img-fluid rounded-circle"
              />
              <h2>{{ story.author.name }}</h2>
              <p>
                {{ story.author.biodata }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    try {
      const { data } = await axios.get(
        `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${params.id}`
      );
      return { story: data.data };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [] };
    }
  },
  methods: {
    getDate(arg) {
      const date = new Date(arg);
      const month = date.toLocaleDateString("default", {month: "long"})
      const day = date.getDate()
      const year = date.getFullYear()
      return `${day} ${month} ${year}`;
    },
    setImage(story) {
      const isCoverImage = story?.cover_image?.url;
      return isCoverImage
        ? `https://storytime-api.strapi.timedoor-js.web.id${story.cover_image.url}`
        : "https://via.placeholder.com/150";
    },
  },
};
</script>