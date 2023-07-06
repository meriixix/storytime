<template>
  <div>
    <!-- Not Empty Story List -->
    <div v-if="storyList.length !== 0">
      <table class="table story-list__table">
        <thead>
          <tr>
            <th class="w-50">Title</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="story in storyList" :key="story.id">
            <th>
              <a href="">{{ story.title }}</a>
            </th>
            <td>{{ getDate(story.updatedAt) }}</td>
            <td>
              <button class="btn btn-outline-primary story-list__btn-edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 36 36"
                  class="font-svg"
                >
                  <path
                    fill="currentColor"
                    d="m4.22 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0L13 32l15.84-15.78L20 7.4Z"
                    class="clr-i-solid clr-i-solid-path-1"
                  />
                  <path
                    fill="currentColor"
                    d="m33.82 8.32l-5.9-5.9a2.07 2.07 0 0 0-2.92 0L21.72 5.7l8.83 8.83l3.28-3.28a2.07 2.07 0 0 0-.01-2.93Z"
                    class="clr-i-solid clr-i-solid-path-2"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
                Edit
              </button>
              <button class="btn btn-outline-primary story-list__btn-save">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  class="font-svg"
                >
                  <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                  />
                </svg>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <ul class="pagination justify-content-end" v-if="pagination.pageCount > 1">
        <li :class="['page-item', { 'disabled': pagination.page == 1}]">
          <button class="page-link page-item__button" href="#" tabindex="-1" @click="previousPage">
            ‹
          </button>
        </li>
        <li
          class="page-item"
          v-for="pageCount in pagination.pageCount"
          :key="pageCount"
        >
          <button
            :class="[
              'page-link page-item__number',
              { active: pageCount == pagination.page },
            ]"
            href="#"
            @click="pageClick(pageCount)"
          >
            {{ pageCount }}
          </button>
        </li>
        <li :class="['page-item', { 'disabled': pagination.page == pagination.pageCount }]">
          <button class="page-link page-item__button" href="#" @click="nextPage">›</button>
        </li>
      </ul>
    </div>

    <!-- Empty Story List -->
    <div class="empty-data" v-if="isEmpty">
      <img src="/images/empty-data.svg" alt="" class="empty-data__img" />
      <h2 class="empty-data__text">No data found</h2>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      storyList: [],
      pagination: {},
      userId: "",
      isEmpty: false
    };
  },
  methods: {
    getDate(arg) {
      const date = new Date(arg);
      const newDate = date.toDateString().split(" ");
      const hour = date.getHours();
      let minutes = date.getMinutes().length > 1 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${hour}:${minutes}, ${newDate[2]} ${newDate[1]} ${newDate[3]}`;
    },
    async pageClick(page) {
      await this.$store.dispatch("story/fetchStoryList", {
        author: this.userId.id,
        page,
      });
      const allData = this.$store.getters["story/getStories"];
      this.pagination = this.$store.getters["story/getPagination"];
      const storySelectedPage =
        this.pagination.total -
        (this.pagination.page - 1) * this.pagination.pageSize;
      this.storyList = allData.slice(-storySelectedPage);
    },
    nextPage() {
      const nextPage = this.pagination.page + 1;
      this.pageClick(nextPage)
    },
    previousPage() {
      const previousPage = this.pagination.page - 1;
      this.pageClick(previousPage)
    }
  },
  async mounted() {
    this.storyList = [];
    this.userId = this.$store.getters["user/getUserData"];
    await this.$store.dispatch("story/fetchStoryList", {
      author: this.userId.id,
    });
    this.storyList = this.$store.getters["story/getStories"];
    this.isEmpty = this.storyList.length > 0 ? false : true;
    this.pagination = this.$store.getters["story/getPagination"];
  },
};
</script>


<style scoped>
.story-list__table th {
  font-weight: 500;
}

.btn {
  padding: 5px 15px;
  font-weight: 500;
  font-size: 14px;
}

.story-list__btn-edit {
  color: black;
  border-radius: 0px;
  border-color: black;
}

.story-list__btn-edit:hover {
  background-color: white;
}

.story-list__btn-save {
  color: red;
  border-radius: 0px;
  border-color: red;
}

.story-list__btn-save:hover {
  color: white;
  background-color: red;
}

table {
  width: 100%;
}

thead th {
  color: #212529;
}

tbody th,
tbody td {
  font-size: 14px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.empty-data {
  text-align: center;
}

.empty-data__img {
  width: 20%;
  margin: 0 auto;
}

.table > :not(caption) > * > * {
  border-top-width: 1px !important;
  border-bottom-width: 0px !important;
  padding: 0.75rem !important;
}

.empty-data__text {
  font-size: 24px;
  margin-top: 15px;
}

/* Pagination */
.page-link:hover {
  text-decoration: none;
}

.page-link {
  color: black;
}

.page-link:active, .page-link:focus {
  box-shadow: 0 0 0 .2rem rgba(14,14,14,.25);
}

.page-link.active {
  z-index: 3;
  background-color: black;
  color: white;
  border-color: black;
}
</style>