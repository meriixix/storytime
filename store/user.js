export const state = () => ({
    user: {}
})

export const getters = {
    getUserData(state) {
        return state.user
    }
}

export const mutations = {
    setUserData(state, payload) {
        state.user = payload
    }
}
