import Vuex from "vuex"
import axios from "axios"

const createStore = () => {
    return new Vuex.Store({
        state: {
            stories: [],
            pagination: {}
        },
        getters: {},
        mutations: {
            setStoryList(state, payload) {
                if ( state.pagination.page == 1) {
                    state.stories = []
                } 
                payload.forEach(story => {
                    state.stories.push(story)
                });
            },
            setPagination(state, payload) {
                state.pagination = payload
            }
        },
        actions: {
            async getStoryList({commit}, payload) {
                const keyword = payload?.keyword ? `=${payload.keyword}` : ""
                const page = payload?.page ? `=${payload.page}` : ""
                const sort = payload?.sort ? `=${payload.sort}` : ""
                const { data } = await axios.get(`https://storytime-api.strapi.timedoor-js.web.id/api/stories?keyword${keyword}&page${page}&sort${sort}`)
                commit("setPagination", data.meta.pagination)
                commit("setStoryList", data.data)
            }
        }
    })
}

export default createStore