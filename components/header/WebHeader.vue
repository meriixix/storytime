<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-light shadow-sm fixed-top bg-white"
    >
      <div class="container-sm">
        <nuxt-link to="/" class="navbar-brand">
          <img src="/images/logo.svg" alt="" />
        </nuxt-link>
        <div>
          <div class="collapse navbar-collapse" id="navbarNav" v-if="getToken">
            <ul class="navbar-nav ms-auto">
              <li to="/user" class="nav-item user">
                <nuxt-link to="/user" tag="a" class="nav-link">
                  <span class="user-icon">
                    <i class="fa-solid fa-user"></i>
                  </span>
                  {{ getUser.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse" id="navbarNav" v-else>
            <ul class="navbar-nav ms-auto">
              <nuxt-link to="/register" tag="li" class="nav-item register">
                <a class="nav-link" href="#">Register</a>
              </nuxt-link>
              <nuxt-link to="/login" tag="li" class="nav-item login">
                <a class="nav-link" href="#">Login</a>
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    getToken() {
      return this.$store.getters["auth/getToken"];
    },
    getUser() {
      return this.$store.getters["user/getUserData"];
    },
  },
};
</script>

<style scoped>
.nav-text {
  color: white;
}

.register {
  text-align: center;
  border: 1px solid black;
  width: 100px;
  margin-right: 15px;
}

.login {
  text-align: center;
  background-color: black;
  width: 100px;
}

.navbar-nav .register a {
  color: black !important;
  font-weight: 500;
}

.navbar-nav .login a {
  color: white !important;
  font-weight: 500;
}

.user {
  width: 250px;
  text-align: center;
  background-color: black;
}

.navbar-nav .user a {
  color: white !important;
  font-weight: 600;
}

.user-icon {
  color: black;
  background-color: white;
  padding: 2px 5px;
  border-radius: 50px;
  margin-right: 2px;
  font-size: 12px;
}
</style>