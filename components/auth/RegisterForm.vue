<template>
  <div>
    <div class="register row justify-content-center">
      <div class="register-body col-5">
        <h1 class="register-title">Register</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              name="Name"
              v-slot="{ errors }"
              rules="required"
            >
              <base-input
                type="text"
                identity="name"
                placeholder="Enter name"
                label="Name"
                :error="errors"
                v-model="name"
                :disabled="formDisabled"
              ></base-input>
            </ValidationProvider>

            <ValidationProvider
              name="Username"
              v-slot="{ errors }"
              rules="required|min:3"
            >
              <base-input
                type="text"
                identity="username"
                placeholder="Enter username"
                label="Username"
                :error="errors"
                v-model="username"
                :disabled="formDisabled"
              ></base-input>
            </ValidationProvider>

            <ValidationProvider
              name="Email"
              v-slot="{ errors }"
              rules="required|email"
            >
              <base-input
                type="email"
                identity="email"
                placeholder="Enter email"
                label="Email"
                :error="errors"
                v-model="email"
                :disabled="formDisabled"
              ></base-input>
            </ValidationProvider>

            <ValidationProvider
              name="Password"
              v-slot="{ errors }"
              rules="required|min:6"
              vid="password"
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
                :disabled="formDisabled"
              ></base-input-group>
            </ValidationProvider>

            <ValidationProvider
              name="Password Confirmation"
              v-slot="{ errors }"
              rules="required|confirmed:password"
            >
              <base-input-group
                :type="confirmPasswordStatus ? 'text' : 'password'"
                identity="password_confirmation"
                placeholder="Enter password confirmation"
                label="Password Confirmation"
                v-model="passwordConfirmation"
                :error="errors"
                @passwordShow="changeConfirmPasswordStatus"
                :isShowPassword="confirmPasswordStatus"
                :data-vv-as="password"
                :disabled="formDisabled"
              ></base-input-group>
            </ValidationProvider>
            <div>
              <button
                type="submit"
                class="register-btn btn btn-dark"
                id="registerButton"
              >
                Register
                <base-spinner v-if="showSpinner"></base-spinner>
              </button>
            </div>
            <div class="mt-3">
              <p>
                Already have account ?
                <nuxt-link to="/login" class="login-btn">Login</nuxt-link>
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>

    <base-error-toast v-if="errorToastShow"></base-error-toast>
  </div>
</template>

<script>
import BaseInput from "../ui/BaseInput.vue";
import BaseInputGroup from "../ui/BaseInputGroup.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseErrorToast from "@/components/ui/BaseErrorToast.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BaseInput,
    ValidationProvider,
    ValidationObserver,
    BaseInputGroup,
    BaseSpinner,
    BaseErrorToast,
  },
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      passwordStatus: false,
      confirmPasswordStatus: false,
      errorToastShow: false,
      errorMessage: "",
      showSpinner: false,
      formDisabled: false,
    };
  },
  methods: {
    async onSubmit() {
      document.getElementById("registerButton").disabled = true;
      this.showSpinner = true;
      this.formDisabled = true

      await this.$store.dispatch("auth/addUserData", {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      });

      this.showSpinner = false;
      this.formDisabled = false

      if (!this.$store.getters["auth/getRegisterStatus"]) {
        this.errorToastShow = true;
        this.errorMessage = this.$store.getters["auth/getErrorMessage"];
        this.$store.commit("setErrorToast", {
          status: true,
          message: this.errorMessage,
        });
      }
    },
    changePasswordStatus() {
      this.passwordStatus = !this.passwordStatus;
    },
    changeConfirmPasswordStatus() {
      this.confirmPasswordStatus = !this.confirmPasswordStatus;
    },
  },
};
</script>

<style scoped>
.register {
  padding-top: 22px;
}
.register-body {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 15px 25px;
}

.register-title {
  font-size: 24px;
}

.btn.register-btn {
  width: 100%;
  border-radius: 0px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 25px;
}

.login-btn {
  font-weight: 500;
  color: black;
  text-decoration: none;
}
</style>
