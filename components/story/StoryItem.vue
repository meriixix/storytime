<template>
  <div class="story-card card shadow-sm rounded-0">
    <button class="btn bookmark" @click="addBookmark(story)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
        class="font22"
        v-if="!bookmarkStatus"
      >
        <path
          fill="currentColor"
          d="M24 16v10.752l-7.096-3.59l-.904-.457l-.9.456L8 26.748V4h10V2H8a2 2 0 0 0-2 2v26l10-5.054L26 30V16Z"
        />
        <path fill="currentColor" d="M26 6V2h-2v4h-4v2h4v4h2V8h4V6h-4z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="font22"
        v-if="bookmarkStatus"
      >
        <path
          fill="currentColor"
          d="M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z"
        />
      </svg>
    </button>
    <nuxt-link
      :to="`/story/${story.id}`"
      tag="img"
      :src="setImage(story)"
      class="img-fluid story-image"
      alt="Story"
    >
    </nuxt-link>
    <div class="card-body">
      <nuxt-link
        :to="`/story/${story.id}`"
        tag="h5"
        class="card-title story-title"
        >{{ story.title }}</nuxt-link
      >
      <p class="card-text story-desc">
        {{ story.content }}
      </p>
      <div class="story-footer">
        <p class="story-footer__author">by {{ story.author.username }}</p>
        <p class="story-footer__date">{{ getDate(story.updatedAt) }}</p>
        <div class="mt-1">
          <p class="story-footer__category">{{ story.category.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    story: { type: Object, require: true },
  },
  data() {
    return {
      isBookmark: false,
    };
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
    addBookmark(story) {
      const token = this.$store.getters["auth/getToken"];
      if (!token) {
        this.$router.push("/login");
      } else {
        if (!story?.cover_image?.url) {
          this.$store.commit("setErrorToast", {
            status: true,
            message: "An error has occurred",
          });
          this.$emit("errorBookmark");
          return;
        }
        if (!this.isBookmark) {
          this.$store.commit("story/setNewBookmark", story);
          this.$store.commit("setSuccessToast", {
            status: true,
            message: "Successfully added story from bookmark",
          });
          this.$store.commit("story/setBookmark");
          this.$emit("bookmarkClick");
        } else {
          this.$store.commit("story/deleteBookmark", story.id);
          this.$store.commit("setSuccessToast", {
            status: true,
            message: "Successfully removed story from bookmark",
          });
          this.$store.commit("story/setBookmark");
          this.$emit("bookmarkClick");
        }
      }
    },
  },
  computed: {
    bookmarkStatus() {
      const bookmarkList = this.$store.getters["story/getBookmarkList"];
      if (bookmarkList) {
        const storyId = this.story.id;
        const result = bookmarkList.find((item) => item.id == storyId);
        this.isBookmark = result ? true : false;
        return result ? true : false;
      } else {
        this.isBookmark = false;
        return false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: none !important;
}

.story-card {
  height: 345px;
  position: relative;
}

.story-title {
  font-size: 18px;
}

.story-title:hover {
  cursor: pointer;
}

.story-image {
  height: 160px;
  object-fit: cover;
}

.story-desc {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.4;
  margin-bottom: 5px;
}

.story-footer {
  font-size: 12px;
}

.story-footer__author,
.story-footer__date,
.story-desc {
  color: #8f8f8f;
}

.story-footer__category,
.story-footer__author,
.story-footer__date {
  margin: 0px;
}

.story-footer__category {
  background-color: #eee;
  display: inline;
  border-radius: 5px;
  padding: 2px 5px;
  color: black;
  font-weight: 500;
}

.bookmark {
  background-color: white;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 7px 9px;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: none;
  transition: all 0.8s ease;
}

.story-card:hover > .bookmark {
  display: block;
}

.story-image:hover {
  cursor: pointer;
}

.bookmark:hover {
  cursor: pointer;
}

.font22 {
  font-size: 22px !important;
}
</style>
