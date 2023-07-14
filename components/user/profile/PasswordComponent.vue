<template>
  <div class="password-container">
    <div class="d-flex justify-content-between">
      <div>
        <h2 class="user-password-title">Password</h2>
      </div>
      <div>
        <button
          class="btn btn-password-edit"
          @click="isEditPassword = true"
          v-if="!isEditPassword"
        >
          <i class="fa-sharp fa-regular fa-pen-to-square"></i>Change Password
        </button>
      </div>
    </div>
    <div class="change-password-form" v-if="isEditPassword">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onPasswordSubmit)">
          <ValidationProvider
            name="Old Password"
            v-slot="{ errors }"
            rules="required"
          >
            <base-input-group
              :type="oldPasswordStatus ? 'text' : 'password'"
              identity="old-password"
              placeholder="Enter old password"
              label="Old Password"
              :error="errors"
              @passwordShow="changeOldPasswordStatus"
              :isShowPassword="oldPasswordStatus"
              v-model="oldPassword"
              :disabled="oldPasswordDisabled"
            ></base-input-group>
          </ValidationProvider>

          <ValidationProvider
            name="New Password"
            v-slot="{ errors }"
            rules="required|min:6"
            vid="newPassword"
          >
            <base-input-group
              :type="newPasswordStatus ? 'text' : 'password'"
              identity="new-password"
              placeholder="Enter New password"
              label="New Password"
              :error="errors"
              @passwordShow="changeNewPasswordStatus"
              :isShowPassword="newPasswordStatus"
              v-model="newPassword"
              :disabled="newPasswordDisabled"
            ></base-input-group>
          </ValidationProvider>

          <ValidationProvider
            name="New Password Confirmation"
            v-slot="{ errors }"
            rules="required|confirmed:newPassword"
          >
            <base-input-group
              :type="newPasswordConfirmationStatus ? 'text' : 'password'"
              identity="new-password-confirmation"
              placeholder="Enter new password confirmation"
              label="New Password Confirmation"
              :error="errors"
              @passwordShow="changeNewPasswordConfirmationStatus"
              :isShowPassword="newPasswordConfirmationStatus"
              v-model="confirmationPassword"
              :disabled="confirmPasswordDisabled"
            ></base-input-group>
          </ValidationProvider>
          <div class="mt-3 edit-password__btn">
            <button
              type="button"
              class="btn btn-outline-primary edit-password__btn-cancel"
              @click="cancelEditPassword"
              id="editPasswordCancel"
            >
              Cancel
            </button>
            <button
              class="btn btn-outline-primary edit-password__btn-save"
              id="editPasswordSave"
            >
              Save
              <base-spinner v-if="showEditPassSpinner"></base-spinner>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <base-error-toast v-if="erorrStatus.isError"></base-error-toast>
    <base-success-toast></base-success-toast>
  </div>
</template>

<script>
import BaseInputGroup from "@/components/ui/BaseInputGroup.vue";
import BaseErrorToast from "@/components/ui/BaseErrorToast.vue";
import BaseSuccessToast from "@/components/ui/BaseSuccessToast.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {
    BaseInputGroup,
    ValidationObserver,
    ValidationProvider,
    BaseErrorToast,
    BaseSuccessToast,
    BaseSpinner,
  },
  data() {
    return {
      oldPasswordStatus: false,
      newPasswordConfirmationStatus: false,
      newPasswordStatus: false,
      isEditPassword: false,
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
      erorrStatus: {},
      showToast: false,
      showEditPassSpinner: false,
      oldPasswordDisabled: false,
      newPasswordDisabled: false,
      confirmPasswordDisabled: false,
    };
  },
  computed: {
    ...mapGetters("user", ["getEditPasswordError"]),
  },
  methods: {
    ...mapMutations(["setSuccessToast", "setErrorToast"]),
    ...mapActions("user", ["resetPassword", "setEditPasswordError"]),
    changeNewPasswordConfirmationStatus() {
      this.newPasswordConfirmationStatus = !this.newPasswordConfirmationStatus;
    },
    changeNewPasswordStatus() {
      this.newPasswordStatus = !this.newPasswordStatus;
    },
    changeOldPasswordStatus() {
      this.oldPasswordStatus = !this.oldPasswordStatus;
    },
    async onPasswordSubmit() {
      this.showEditPassSpinner = true;
      this.oldPasswordDisabled = true;
      this.newPasswordDisabled = true;
      this.confirmPasswordDisabled = true;

      await this.resetPassword({
        currentPassword: this.oldPassword,
        newPassword: this.newPassword,
      });

      this.oldPassword = "";
      this.newPassword = "";
      this.confirmationPassword = "";
      this.isEditPassword = false;

      this.showEditPassSpinner = false;
      this.oldPasswordDisabled = false;
      this.newPasswordDisabled = false;
      this.confirmPasswordDisabled = false;

      this.erorrStatus = this.getEditPasswordError;
      if (this.erorrStatus.isError) {
        this.setErrorToast({
          status: true,
          message: this.erorrStatus.message,
        });
      } else {
        this.setSuccessToast({
          status: true,
          message: "Successfully update new password",
        });
      }
    },
    closeToast() {
      this.setEditPasswordError({ isError: false, message: "" });
      this.erorrStatus = this.getEditPasswordError;
      this.showToast = false;
    },
    cancelEditPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmationPassword = "";
      this.isEditPassword = false;
    },
  },
  watch: {
    showToast(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.closeToast();
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.edit-password__btn {
  display: flex;
  justify-content: flex-end;
}

.edit-password__btn .btn {
  margin-left: 5px;
}

.edit-password__btn-cancel,
.edit-password__btn-save {
  padding: 7px 25px;
}

.btn-outline-primary {
  color: #0e0e0e;
  border-color: #0e0e0e;
}

.edit-password__btn-cancel:hover {
  background-color: white;
}

.edit-password__btn-save {
  background-color: #343434;
  color: white;
}

.btn {
  border-radius: 0px;
}

.btn.focus {
  box-shadow: none;
}

.password-container {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-top: 30px;
}

.user-password-title {
  font-size: 24px;
}

.btn-password-edit {
  border-color: black;
  border-radius: 0px;
  font-weight: 500;
  font-size: 14px;
}

.fa-sharp {
  padding-right: 5px;
}

.change-password-form {
  margin-top: 30px;
}
</style>