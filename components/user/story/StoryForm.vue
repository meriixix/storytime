<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider name="Title" v-slot="{ errors }" rules="required">
        <base-input
          type="text"
          identity="title"
          placeholder="Enter a story title"
          label="Title"
          :error="errors"
          v-model="storyData.title"
        ></base-input>
      </ValidationProvider>
      <ValidationProvider name="Category" v-slot="{ errors }" rules="required">
        <base-select
          :options="categoryList"
          label="Category"
          v-model="storyData.category"
          :selected="storyData.category"
          :error="errors"
        ></base-select>
      </ValidationProvider>

      <ValidationProvider name="Content" v-slot="{ errors }" rules="required">
        <base-quill v-model="storyData.content" :error="errors"></base-quill>
      </ValidationProvider>

      <!-- Cover Image Start -->
      <div>
        <div v-if="!storyData.coverImage">
          <ValidationProvider
            name="Cover Image"
            ref="provider"
            v-slot="{ errors }"
            rules="required|image"
          >
            <base-input
              type="file"
              identity="cover-image"
              placeholder="''"
              label="Cover Image"
              :error="errors"
              @onFileSelected="onImageSelected"
            ></base-input>
          </ValidationProvider>
        </div>
        <div v-else>
          <div class="image-preview">
            <img
              :src="storyData.coverImage"
              :alt="storyData.title"
              class="image-preview__img"
            />
            <button
              class="btn btn-danger image-review__remove-btn"
              type="button"
              @click="closeImagePreview"
            >
              x
            </button>
          </div>
        </div>
      </div>
      <!-- Cover Image End -->
      <!-- Button Start -->
      <div class="mt-3 story-form__btn">
        <button
          type="button"
          class="btn btn-outline-primary story-form__btn-cancel"
          id="storyButtonCancel"
          @click="cancelButton"
        >
          Batal
        </button>
        <button
          class="btn btn-outline-primary story-form__btn-save"
          id="storyButtonSave"
        >
          Simpan
          <base-spinner v-if="showSpinner"></base-spinner>
        </button>
      </div>
      <!-- Button End -->
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseQuill from "@/components/ui/BaseQuill.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseInput,
    BaseSelect,
    BaseQuill,
    BaseSpinner,
  },
  props: {
    isEdit: { type: Boolean, require: false, default: false },
  },
  data() {
    return {
      storyData: {
        title: "",
        category: "",
        content: "",
        imageFile: "",
        coverImage: "",
      },
      storyImageId: "",
      categoryList: [],
      showSpinner: false,
    };
  },
  computed: {
    ...mapGetters("story", ["getCategoryList", "getDetailStory"]),
  },
  async mounted() {
    this.categoryList = [];
    await this.fetchCategoryList();
    this.categoryList = this.getCategoryList;
    if (this.isEdit) {
      const storyId = this.$route.params.id;
      await this.fetchDetailStory(storyId);
      const detailStory = this.getDetailStory;
      this.storyData.title = detailStory.title;
      this.storyData.category = detailStory.categoryId.toString();
      this.storyData.content = detailStory.content;
      this.storyData.coverImage = detailStory.story_image;
      this.storyImageId = detailStory.storyImageId;
    }
  },
  methods: {
    ...mapMutations(["setSuccessToast"]),
    ...mapActions("story", [
      "fetchCategoryList",
      "fetchDetailStory",
      "updateStory",
      "createStory",
    ]),
    async onImageSelected(e) {
      const file = e.files[0];
      if (file.size > 2097152) {
        alert("Maximum file size is 2MB");
        return;
      }
      this.imageDetail = {
        type: e.files[0].type,
        name: e.files[0].name,
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.storyData.coverImage = reader.result;
        this.storyData.imageFile = file;
      });
    },
    cancelButton() {
      this.$router.push("/user/story");
    },
    async onSubmit() {
      this.showSpinner = true;
      document.getElementById("storyButtonCancel").disabled = true;
      document.getElementById("storyButtonSave").disabled = true;
      if (this.isEdit) {
        const storyId = this.$route.params.id;
        await this.updateStory({
          storyData: this.storyData,
          storyId,
          imageId: this.storyImageId,
        });
        this.$router.push("/user/story");
        this.setSuccessToast({
          status: true,
          message: "Successfully edit story",
        });
      } else {
        await this.createStory(this.storyData);
        this.$router.push("/user/story");
        this.setSuccessToast({
          status: true,
          message: "Successfully create story",
        });
      }
      this.showSpinner = false;
      document.getElementById("storyButtonCancel").disabled = false;
      document.getElementById("storyButtonSave").disabled = false;
    },
    closeImagePreview() {
      this.storyData.coverImage = "";
      this.storyData.imageFile = "";
    },
  },
};
</script>

<style scoped>
.image-preview {
  height: 300px;
  width: 300px;
}

.image-preview__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}

.image-review__remove-btn {
  border-radius: 50% !important;
  position: absolute;
  height: 30px;
  width: 30px;
  padding: 0;
  background-color: red;
  border-color: red;
}

.story-form__btn {
  display: flex;
  justify-content: flex-end;
}

.story-form__btn .btn {
  margin-left: 5px;
}

.story-form__btn-cancel,
.story-form__btn-save {
  padding: 7px 25px;
}

.btn-outline-primary {
  color: #0e0e0e;
  border-color: #0e0e0e;
}

.story-form__btn-cancel:hover {
  background-color: white;
}

.story-form__btn-save {
  background-color: #343434;
  color: white;
}

.btn {
  border-radius: 0px;
}

.btn:focus {
  box-shadow: none;
}
</style>