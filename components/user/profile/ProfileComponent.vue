<template>
  <div class="user-container">
    <div class="d-flex justify-content-between">
      <div>
        <h2 class="profile-title">My Profile</h2>
      </div>
      <div>
        <button
          class="btn btn-edit-profile shadow-none"
          @click="isEditProfile = true"
          v-if="!isEditProfile"
        >
          <i class="fa-sharp fa-regular fa-pen-to-square"></i>Edit Profile
        </button>
      </div>
    </div>
    <div class="mt-4 row">
      <!-- Avatar Start-->
      <div class="col-4">
        <!-- Cropper Area Start -->
        <div
          class="modal fade"
          id="cropperModal"
          tabindex="-1"
          aria-modal="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Adjust Image</h5>
                <button
                  type="button"
                  class="btn-close shadow-none"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="cropImg = ''"
                ></button>
              </div>
              <div class="modal-body">
                <div>
                  <vue-cropper
                    ref="cropper"
                    :aspect-ratio="1"
                    :src="cropImg"
                    v-show="cropImg"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-primary edit-profile__btn-cancel shadow-none"
                  data-bs-dismiss="modal"
                  @click="cropImg = ''"
                  id="cropperCancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary edit-profile__btn-save shadow-none"
                  @click.prevent="cropImage"
                  id="cropperChanges"
                >
                  Changes
                  <base-spinner v-if="showCropSpinner"></base-spinner>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Cropper Area End -->

        <!-- Profile Image Start -->
        <div>
          <div class="profile-image">
            <img :src="profileImage" alt="Avatar" />
          </div>
          <div>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="avatar-btn"
              class="d-none"
              @change="setImage"
            />
            <label for="avatar-btn" class="btn change-avatar-btn"
              >Change Avatar</label
            >
          </div>

          <base-error-toast v-if="errorProfileImageSize"></base-error-toast>
          <base-success-toast v-if="editAvatarToastShow"></base-success-toast>
        </div>
        <!-- Profile Image End -->
      </div>
      <!-- Avatar End -->

      <!-- Biodata Start -->
      <div class="col-8">
        <div class="user-biodata" v-if="!isEditProfile">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{ userData.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ userData.email }}</td>
              </tr>
              <tr>
                <th>Biodata</th>
                <td>{{ userData.biodata ? userData.biodata : "-" }}</td>
              </tr>
            </tbody>
          </table>
          <base-success-toast></base-success-toast>
        </div>
        <div class="edit-profile" v-else>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onProfileSubmit)">
              <ValidationProvider
                name="Name"
                v-slot="{ errors }"
                rules="required"
              >
                <base-input
                  type="text"
                  identity="name"
                  label="Name"
                  v-model="userData.name"
                  :error="errors"
                  :disabled="nameInputDisabled"
                ></base-input>
              </ValidationProvider>

              <base-input
                type="email"
                identity="email"
                label="Email"
                v-model="userData.email"
                :disabled="true"
              ></base-input>

              <base-text-area
                identity="biodata"
                label="Biodata"
                v-model="userData.biodata"
                :disabled="biodataInputDisabled"
              ></base-text-area>

              <div class="mt-3 edit-profile__btn">
                <button
                  type="button"
                  class="btn btn-outline-primary edit-profile__btn-cancel shadow-none"
                  @click="isEditProfile = false"
                  id="editProfileCancel"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-outline-primary edit-profile__btn-save shadow-none"
                  id="editProfileSave"
                >
                  Save
                  <base-spinner v-if="showEditProfileSpinner"></base-spinner>
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <!-- Biodata End -->
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseSuccessToast from "~/components/ui/BaseSuccessToast.vue";
import BaseErrorToast from "@/components/ui/BaseErrorToast.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      profileImage: "",
      cropImg: "",
      cropper: "",
      imageDetail: {},
      userData: { email: "", name: "", biodata: "" },
      isEditProfile: false,
      editAvatarToastShow: false,
      editProfileToastShow: false,
      errorProfileImageSize: false,
      showCropSpinner: false,
      showEditProfileSpinner: false,
      nameInputDisabled: false,
      biodataInputDisabled: false,
      cropModal: null,
    };
  },
  components: {
    VueCropper,
    BaseInput,
    ValidationObserver,
    ValidationProvider,
    BaseTextArea,
    BaseSuccessToast,
    BaseErrorToast,
    BaseSpinner,
  },
  computed: {
    ...mapGetters(["user/getUserData"]),
  },
  mounted() {
    this.cropModal = new bootstrap.Modal("#cropperModal");
    const { email, name, biodata, profile_picture, id } =
      this["user/getUserData"];
    this.profileImage = profile_picture
      ? `https://storytime-api.strapi.timedoor-js.web.id${profile_picture.url}`
      : "https://via.placeholder.com/150";
    this.userData = { email, name, biodata, id };
  },
  methods: {
    ...mapMutations(["setErrorToast", "setSuccessToast"]),
    ...mapActions([
      "user/deleteUserImageProfile",
      "user/postUserProfile",
      "user/ediUserProfile",
    ]),
    setImage(e) {
      const file = e.target.files[0];
      if (file.size > 2097152) {
        this.errorProfileImageSize = true;
        this.setErrorToast({
          status: true,
          message: "Maximum file size is 2MB",
        });
        document.getElementById("avatar-btn").value = "";
        return;
      }
      this.imageDetail = {
        type: e.target.files[0].type,
        name: e.target.files[0].name,
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setTimeout(() => {
          this.cropImg = reader.result;
          this.$refs.cropper.replace(reader.result);
        }, 150);
        e.target.value = "";
      });
      this.cropModal.show();
    },
    cropImage() {
      this.showCropSpinner = true;
      document.getElementById("cropperCancel").disabled = true;
      document.getElementById("cropperChanges").disabled = true;

      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const form = new FormData();
        form.append("files", blob);
        form.append("refId", this.userData.id);
        form.append("ref", "plugin::users-permissions.user");
        form.append("field", "profile_picture");
        this.updateProfilePicture(form);
      }, "image/*");
    },
    async updateProfilePicture(form) {
      let { profile_picture } = this["user/getUserData"];
      if (profile_picture) {
        await this["user/deleteUserImageProfile"](profile_picture.id);
        await this["user/postUserProfile"](form);
        let user = this["user/getUserData"];
        this.profileImage = `https://storytime-api.strapi.timedoor-js.web.id${user.profile_picture.url}`;
      } else {
        await this["user/postUserProfile"](form);
      }

      this.cropModal.hide();

      this.cropImg = "";
      this.showCropSpinner = false;
      document.getElementById("cropperCancel").disabled = false;
      document.getElementById("cropperChanges").disabled = false;

      this.editAvatarToastShow = true;
      this.setSuccessToast({
        status: true,
        message: "Successfully change avatar",
      });
    },
    async onProfileSubmit() {
      this.showEditProfileSpinner = true;
      document.getElementById("editProfileCancel").disabled = true;
      document.getElementById("editProfileSave").disabled = true;
      this.biodataInputDisabled = true;
      this.nameInputDisabled = true;

      await this["user/ediUserProfile"]({
        biodata: this.userData.biodata,
        name: this.userData.name,
      });

      this.isEditProfile = false;
      this.showEditProfileSpinner = false;
      document.getElementById("editProfileCancel").disabled = false;
      document.getElementById("editProfileSave").disabled = false;
      this.biodataInputDisabled = false;
      this.nameInputDisabled = false;

      this.setSuccessToast({
        status: true,
        message: "Successfully update profile",
      });
    },
  },
  watch: {
    editAvatarToastShow(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.editAvatarToastShow = false;
        }, 5000);
      }
    },
    errorProfileImageSize(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.errorProfileImageSize = false;
        }, 5000);
      }
    },
  },
};
</script>


<style scoped>
/* Edit Profile Button Start */
.edit-profile__btn {
  display: flex;
  justify-content: flex-end;
}

.edit-profile__btn .btn {
  margin-left: 5px;
}

.edit-profile__btn-cancel,
.edit-profile__btn-save {
  padding: 7px 25px;
}

.btn {
  border-radius: 0;
  font-weight: 500;
}

.cropper-container img {
  width: 446px;
}

.btn-outline-primary {
  color: #0e0e0e;
  border-color: #0e0e0e;
}

.btn.btn-cancel:hover,
.edit-profile__btn-cancel:hover {
  background-color: white;
}

.btn-change,
.edit-profile__btn-save {
  background-color: #343434;
  color: white;
}

.btn-change:hover {
  background-color: #0e0e0e;
}

.list-group {
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}

.list-group-item {
  border-top: 1px solid #dee2e6;
}
/* Cropper Style End */

.cropper-canvas {
  width: 446px;
}

.user-container {
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.profile-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.profile-image {
  margin-bottom: 20px;
}

.change-avatar-btn {
  border-color: black;
  border-radius: 0px;
  width: 200px;
  font-weight: 500;
}

.btn-edit-profile {
  border-color: black;
  border-radius: 0px;
  font-weight: 500;
  font-size: 14px;
}

.profile-title {
  font-size: 24px;
}

.fa-sharp {
  padding-right: 5px;
}

th {
  width: 100px;
}

td,
th {
  padding-bottom: 20px;
}
</style>