<template>
  <div>
    <div class="login row justify-content-center">
      <div class="login-body col-5">
        <h1 class="login-title">Login</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              name="Email/Username"
              v-slot="{ errors }"
              rules="required"
            >
              <base-input
                type="text"
                identity="identifier"
                placeholder="Enter email/username"
                label="Email/Username"
                :error="errors"
                v-model="identifier"
              ></base-input>
            </ValidationProvider>

            <ValidationProvider
              name="Password"
              v-slot="{ errors }"
              rules="required"
            >
              <base-input-group
                :type="passwordStatus ? 'text' : 'password'"
                identity="password"
                placeholder="Enter password"
                label="Password"
                v-model="password"
                :error="errors"
                @passwordShow="changePasswordStatus"
                :isShowPassword="passwordStatus"
              ></base-input-group>
            </ValidationProvider>
            <div>
              <button type="submit" class="login-btn btn btn-dark">
                Login
              </button>
            </div>
            <div>
              <p>
                Don't have an account yet ?
                <nuxt-link to="/register" class="register-btn"
                  >Register</nuxt-link
                >
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!-- Tast Start -->
    <failed-auth-toast :isToastShow="isToastShow" :errorMessage="errorMessage" @closeToast="isToastShow = false"></failed-auth-toast>
    <!-- Toast End -->
  </div>
</template>

<script>
import BaseInput from "../ui/BaseInput.vue";
import BaseInputGroup from "../ui/BaseInputGroup.vue";
import FailedAuthToast from "./FailedAuthToast.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BaseInput,
    ValidationProvider,
    ValidationObserver,
    BaseInputGroup,
    FailedAuthToast,
  },
  data() {
    return {
      identifier: "",
      password: "",
      passwordStatus: false,
      isToastShow: false,
      errorMessage: "",
    };
  },
  methods: {
    changePasswordStatus() {
      this.passwordStatus = !this.passwordStatus;
    },
    async onSubmit() {
      await this.$store.dispatch("auth/fetchUserLogin", {
        identifier: this.identifier,
        password: this.password,
      });

      if (!this.$store.getters["auth/getLoginStatus"]) {
        this.isToastShow = true;
        this.errorMessage = this.$store.getters["auth/getErrorMessage"];
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding-top: 22px;
}

.login-body {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 15px 25px;
}

.login-title {
  font-size: 24px;
}

.btn.login-btn {
  width: 100%;
  border-radius: 0px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 25px;
}

.register-btn {
  font-weight: 500;
  color: black;
  text-decoration: none;
}
</style>