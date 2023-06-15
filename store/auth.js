export const state = () => ({
    registerStatus: false,
    loginStatus: false,
    token: null,
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
    async fetchUserLogin({ commit }, payload) {
        try {
            const { data } = await this.$axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/auth/local', payload)
            const { jwt, user } = data.data
            commit("setToken", jwt)
            commit("user/setUserData", user, { root: true })
            commit("setLoginStatus", true)
        } catch (error) {
            const response = error.response.data
            commit("setErrorMessage", response.error.message)
        }
    },
}