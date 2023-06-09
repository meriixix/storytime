<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm fixed-top bg-white">
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