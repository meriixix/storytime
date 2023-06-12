<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-light shadow-sm fixed-top bg-white"
    >
      <div class="container-sm">
        <nuxt-link to="/" class="navbar-brand">
          <img src="/images/logo.svg" alt="" />
        </nuxt-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item register">
              <a class="nav-link" href="#">Register</a>
            </li>
            <li class="nav-item login">
              <a class="nav-link" href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

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
</style>