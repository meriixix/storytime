<template>
  <div class="row gy-4">
    <nuxt-link
      :to="`/story/${story.id}`"
      tag="div"
      class="col-3"
      v-for="story in stories"
      :key="story.id"
    >
      <div class="story-card card shadow-sm rounded-0" style="width: 16rem">
        <img :src="setImage(story)" class="img-fluid story-image" alt="Story" />
        <div class="card-body">
          <h5 class="card-title story-title">{{ story.title }}</h5>
          <p class="card-text story-desc">
            {{ story.content }}
          </p>
          <div class="story-footer">
            <p class="story-footer__author">by {{ story.author.username }}</p>
            <p class="story-footer__date">{{ getDate(story.createdAt) }}</p>
            <div class="mt-1">
              <p class="story-footer__category">{{ story.category.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    stories: { type: Array, require: true },
  },
  methods: {
    getDate(arg) {
      const date = new Date(arg);
      const newDate = date.toDateString().split(" ");
      return `${newDate[2]} ${newDate[1]} ${newDate[3]}`;
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
