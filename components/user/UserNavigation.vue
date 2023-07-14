<template>
  <div>
    <ul class="user-navigation list-group">
      <nuxt-link to="/user" tag="li" class="list-group-item user-navigation__item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"/><path fill="currentColor" d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9h-1.5ZM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75v-1.5ZM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9h1.5ZM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25v1.5ZM5.166 17.856l-.719-.214l-.117.392l.267.31l.569-.488Zm13.668 0l.57.489l.266-.31l-.117-.393l-.719.214ZM9 15.75h6v-1.5H9v1.5Zm0-1.5a4.752 4.752 0 0 0-4.553 3.392l1.438.428A3.252 3.252 0 0 1 9 15.75v-1.5Zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75v-1.5Zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.752 4.752 0 0 0 15 14.25v1.5Zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405l-1.138-.977Z"/></g></svg>
        My Profile
      </nuxt-link>
      <nuxt-link to="/user/story" tag="li" class="list-group-item user-navigation__item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M15 8h9v2h-9z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M15 12h9v2h-9z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M15 16h9v2h-9z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="M15 20h9v2h-9z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M15 24h9v2h-9z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="M11 8h2v2h-2z" class="clr-i-outline clr-i-outline-path-6"/><path fill="currentColor" d="M11 12h2v2h-2z" class="clr-i-outline clr-i-outline-path-7"/><path fill="currentColor" d="M11 16h2v2h-2z" class="clr-i-outline clr-i-outline-path-8"/><path fill="currentColor" d="M11 20h2v2h-2z" class="clr-i-outline clr-i-outline-path-9"/><path fill="currentColor" d="M11 24h2v2h-2z" class="clr-i-outline clr-i-outline-path-10"/><path fill="currentColor" d="M28 2H8a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm0 30H8V4h20Z" class="clr-i-outline clr-i-outline-path-11"/><path fill="none" d="M0 0h36v36H0z"/></svg>
        Story List
      </nuxt-link>
      <nuxt-link to="/user/bookmark" tag="li" class="list-group-item user-navigation__item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-size" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z"/></svg>
        Bookmark
      </nuxt-link>
      <li class="list-group-item user-navigation__logout">
        <button
          class="btn logout-btn shadow-none"
          data-bs-toggle="modal"
          data-bs-target="#logoutModal"
        >
          <span>Logout</span
          ><i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </li>
    </ul>
    <!-- Modal Start -->
    <div class="modal fade" id="logoutModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Logout</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Are you sure want to logout?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary btn-cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-outline-primary btn-logout"
              @click="logout"
              data-bs-dismiss="modal"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  methods: {
    ...mapMutations("auth", ["setToken"]),
    ...mapMutations("story", ["getBookmark"]),
    logout() {
      localStorage.removeItem("storyTimeBookmark")
      this.getBookmark()
      this.setToken(false);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.user-navigation__item {
  color: #8f8f8f;
  font-size: 14px;
  transition: all 0.3s ease;
  padding: 10px;
}

.user-navigation {
  border-radius: 0px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-color: none;
  font-size: 14px !important;
}

.fa-regular {
  padding-right: 8px;
}

.user-navigation__item:hover {
  cursor: pointer;
  background-color: #eee;
  color: #0e0e0e;
}

.logout-btn {
  width: 100%;
  border-radius: 0px;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 25px;
  border-color: red;
  color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  color: white;
  background-color: red;
}

.user-navigation__logout {
  padding: 10px;
}

.btn-outline-primary {
  color: #0e0e0e;
  border-color: #0e0e0e;
  border-radius: 0px;
}

.btn {
  padding: 7px 25px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-cancel {
  margin-right: 5px !important;
}

.btn-cancel:hover {
  background-color: white;
}

.btn-logout {
  background-color: #343434;
  color: white;
}

.btn-logout:hover {
  background-color: black;
}

.icon-size {
  font-size: 20px !important;
}
</style>