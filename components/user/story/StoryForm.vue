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
          @click="cancelButton"
        >
          Batal
        </button>
        <button class="btn btn-outline-primary story-form__btn-save">
          Simpan
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseInput,
    BaseSelect,
    BaseQuill,
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
      categoryList: [],
    };
  },
  async mounted() {
    this.categoryList = [];
    await this.$store.dispatch("story/fetchCategoryList");
    this.categoryList = this.$store.getters["story/getCategoryList"];
  },
  methods: {
    async onImageSelected(e) {
      const file = e.files[0];
      if ( file.size > 2097152 ) {
        alert("Maximum file size is 2MB")
        return
      }
      this.imageDetail = {
        type: e.files[0].type,
        name: e.files[0].name,
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.storyData.coverImage = reader.result;
        this.storyData.imageFile = file
      });
    },
    cancelButton() {
      this.$router.push("/user/story")
    },
    async onSubmit() {
      await this.$store.dispatch("story/createStory", this.storyData)
      this.$router.push("/user/story")
      this.$store.commit("story/setIsNewStoryAdded", true)
    },
    closeImagePreview() {
      this.storyData.coverImage = ""
      this.storyData.imageFile = ""
    }
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
  border-radius: 50%!important;
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