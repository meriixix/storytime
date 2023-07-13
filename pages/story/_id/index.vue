<template>
  <main class="main-wrapper">
    <div class="detail-container container-sm">
      <div class="row justify-content-center">
        <div class="col-8">
          <div class="story">
            <h3 class="story__title">{{ story.title }}</h3>
            <p class="story__date">{{ getDate(story.updatedAt) }}</p>
            <div class="detail-image">
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
                  <path
                    fill="currentColor"
                    d="M26 6V2h-2v4h-4v2h4v4h2V8h4V6h-4z"
                  />
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

    <!-- Toast Start -->
    <base-success-toast v-if="isToastShow"></base-success-toast>
    <!-- Toast End -->
  </main>
</template>

<script>
import BaseSuccessToast from "@/components/ui/BaseSuccessToast.vue";
export default {
  data() {
    return {
      story: {},
      isBookmark: false,
      isToastShow: false,
    };
  },
  components: {
    BaseSuccessToast,
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
    addBookmark(story) {
      const token = this.$store.getters["auth/getToken"];
      if (!token) {
        this.$router.push("/login");
      } else {
        if (!story.storyImageId) {
          this.$store.commit("setErrorToast", {
            status: true,
            message: "An error has occurred",
          });
          this.$emit("errorBookmark");
          return;
        }
        const storyForBookmark =
          this.$store.getters["story/getStoryForBookmark"];
        if (!this.isBookmark) {
          this.$store.commit("story/setNewBookmark", storyForBookmark);
          this.$store.commit("setSuccessToast", {
            status: true,
            message: "Successfully added story from bookmark",
          });
          this.$store.commit("story/setBookmark");
        } else {
          this.$store.commit("story/deleteBookmark", this.$route.params.id);
          this.$store.commit("setSuccessToast", {
            status: true,
            message: "Successfully removed story from bookmark",
          });
          this.$store.commit("story/setBookmark");
        }
        this.isToastShow = true;
      }
    },
  },
  computed: {
    bookmarkStatus() {
      const bookmarkList = this.$store.getters["story/getBookmarkList"];
      if (bookmarkList) {
        const storyId = this.$route.params.id;
        const result = bookmarkList.find((item) => item.id == storyId);
        this.isBookmark = result ? true : false;
        return result ? true : false;
      } else {
        this.isBookmark = false;
        return false;
      }
    },
  },
  watch: {
    isToastShow(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.isToastShow = false;
        }, 5000);
      }
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
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
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

.bookmark {
  background-color: white;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 9px 11px;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.font22 {
  font-size: 22px !important;
}
</style>