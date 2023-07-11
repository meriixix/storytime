export const state = () => ({
    stories: [],
    pagination: {},
    detailStory: {},
    categoryList: {},
    storyId: "",
})

export const getters = {
    getPagination(state) {
        return state.pagination
    },
    getStories(state) {
        return state.stories
    },
    getDetailStory(state) {
        return state.detailStory
    },
    getCategoryList(state) {
        return state.categoryList
    },
    getStoryId(state) {
        return state.storyId
    }
}

export const mutations = {
    setStoryList(state, payload) {
        if (state.pagination.page == 1) {
            state.stories = []
        }
        payload.forEach(story => {
            state.stories.push(story)
        });
    },
    setPagination(state, payload) {
        state.pagination = payload
    },
    setDetailStory(state, payload) {
        state.detailStory = payload
    },
    setCategoryList(state, payload) {
        state.categoryList = payload
    },
    setStoryId(state, payload) {
        state.storyId = payload
    },
    deleteStory(state, payload) {
        const newStory = state.stories.map(item => {
            return item.id !== payload
        })
        state.stories = newStory
    }
}

export const actions = {
    async fetchStoryList({ commit }, payload) {
        const keyword = payload?.keyword ? `=${payload.keyword}` : ""
        const page = payload?.page ? `=${payload.page}` : ""
        const sort = payload?.sort ? `=${payload.sort}` : ""
        const author = payload?.author ? `=${payload.author}` : ""
        const { data } = await this.$axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories?keyword${keyword}&page${page}&sort${sort}&author${author}`)
        commit("setPagination", data.meta.pagination)
        commit("setStoryList", data.data)
    },
    async fetchDetailStory({ commit }, storyId) {
        const { data } = await this.$axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${storyId}`)
        const { title, content, createdAt, cover_image, author: { profile_picture, name, biodata }, category } = data.data
        const story_image = cover_image?.url ? `https://storytime-api.strapi.timedoor-js.web.id${cover_image.url}` : "https://via.placeholder.com/150"
        const story_image_id = cover_image?.id ? cover_image.id : null;
        commit("setDetailStory", { title, content, createdAt, name, biodata, story_image, profile_picture: profile_picture.url, categoryId: category.id, storyImageId: story_image_id })
    },
    async fetchCategoryList({ commit }) {
        const { data } = await this.$axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/categories`)
        commit("setCategoryList", data.data)
    },
    async createStory({ dispatch, rootGetters }, { title, category, content, imageFile }) {
        try {
            const { data } = await this.$axios.post(`https://storytime-api.strapi.timedoor-js.web.id/api/stories`, { title, category, content }, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })

            const form = new FormData();
            form.append("files", imageFile);
            form.append("refId", data.data.id);
            form.append("ref", "api::story.story");
            form.append("field", "cover_image");

            try {
                dispatch("uploadStoryImage", form)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("New Story", error);
        }
    },
    async uploadStoryImage({ rootGetters }, payload) {
        try {
            const { data } = await this.$axios.post(`https://storytime-api.strapi.timedoor-js.web.id/api/upload`, payload, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
        } catch (error) {
            console.log("Upload Story Image", error);
        }
    },
    async updateStory({ rootGetters, dispatch }, { storyData, storyId, imageId }) {
        try {
            const { data } = await this.$axios.put(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${storyId}`, { data: { title: storyData.title, content: storyData.content, category: parseInt(storyData.category) } }, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
            if (storyData.imageFile) {
                await this.$axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/upload/files/${imageId}`, {
                    headers: {
                        'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                    }
                })
            }

            const form = new FormData();
            form.append("files", storyData.imageFile);
            form.append("refId", storyId);
            form.append("ref", "api::story.story");
            form.append("field", "cover_image");

            try {
                dispatch("uploadStoryImage", form)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    },
    async deleteStory({rootGetters}, storyId) {
        try {
            await this.$axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${storyId}`, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
}