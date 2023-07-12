export const state = () => ({
    showSuccessToast: { status: false, message: "" },
    showErrorToast : { status: false, message: "" }
})

export const getters = {
    getShowSuccessToast(state) {
        return state.showSuccessToast
    },
    getShowErrorToast(state) {
        return state.showErrorToast
    }
}

export const mutations = {
    setSuccessToast(state, payload) {
        state.showSuccessToast = payload
    },
    setErrorToast(state, payload) {
        state.showErrorToast = payload
    }
}

export const actions = {
    async nuxtServerInit({ commit }, payload) {
        const token = this.$cookies.get("jwt")
        if (token) {
            try {
                const { data } = await this.$axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // commit("story/getBookmark")
                commit("auth/setToken", token)
                commit("user/setUserData", data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}