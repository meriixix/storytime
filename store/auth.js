export const state = () => ({
    registerStatus: false,
    loginStatus: false,
    token: false,
    errorMessage: ""
})

export const getters = {
    getRegisterStatus(state) {
        return state.registerStatus
    },
    getLoginStatus(state) {
        return state.loginStatus
    },
    getToken(state) {
        return state.token
    },
    getErrorMessage(state) {
        return state.errorMessage
    }
}

export const mutations = {
    setRegisterStatus(state, payload) {
        state.registerStatus = payload
    },
    setLoginStatus(state, payload) {
        state.loginStatus = payload
    },
    setToken(state, payload) {
        this.$cookies.set('jwt', payload)
        state.token = payload
    },
    setErrorMessage(state, payload) {
        console.log(payload)
        state.errorMessage = payload
    }
}

export const actions = {
    async addUserData({ commit }, payload) {
        try {
            await this.$axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register', payload)
            commit("setRegisterStatus", true)
        } catch (error) {
            const response = error.response.data
            commit("setErrorMessage", response.error.message)
        }
    },
    async fetchUserLogin({ commit, dispatch }, payload) {
        try {
            const { data } = await this.$axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local', payload)
            const { jwt } = data.data
            commit("setToken", jwt)
            commit("setLoginStatus", true)
            dispatch("user/getUserProfile", jwt, { root: true })
        } catch (error) {
            const response = error.response.data
            commit("setErrorMessage", response.error.message)
        }
    },
}