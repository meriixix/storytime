<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div class="register-success">
        <img
          src="/images/success.svg"
          alt="Success"
          class="register-success__img"
        />
        <h2 class="register-success__text">REGISTRATION SUCCESS</h2>
        <nuxt-link to="/login">
          <button class="btn btn-dark">Login</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-success {
  text-align: center;
}

.register-success__img {
  width: 50%;
  margin: 0 auto;
}
.register-success__text {
  text-align: center;
  margin: 15px 0;
  font-weight: 600;
  font-size: 32px;
}

.btn {
  border-radius: 0px;
  font-weight: 500;
  width: 100px;
}
</style>