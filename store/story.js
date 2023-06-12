export const state = () => ({
    stories: [],
    pagination: {},
    detailStory: {}
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
    }
}

export const actions = {
    async fetchStoryList({ commit }, payload) {
        const keyword = payload?.keyword ? `=${payload.keyword}` : ""
        const page = payload?.page ? `=${payload.page}` : ""
        const sort = payload?.sort ? `=${payload.sort}` : ""
        const { data } = await this.$axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories?keyword${keyword}&page${page}&sort${sort}`)
        commit("setPagination", data.meta.pagination)
        commit("setStoryList", data.data)
    },
    async fetchDetailStory({ commit }, payload) {
        const { data } = await this.$axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${payload}`)
        const { title, content, createdAt, cover_image, author: { profile_picture, name, biodata } } = data.data
        const story_image = cover_image?.url ? `https://storytime-api.strapi.timedoor-js.web.id${cover_image.url}` : "https://via.placeholder.com/150"
        commit("setDetailStory", { title, content, createdAt, name, biodata, story_image, profile_picture: profile_picture.url })
    }
}