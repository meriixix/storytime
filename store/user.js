export const state = () => ({
    user: {},
    editPasswordError: { isError: false, message: "" },
})

export const getters = {
    getUserData(state) {
        return state.user
    },
    getEditPasswordError(state) {
        return state.editPasswordError;
    }
}

export const mutations = {
    setUserData(state, payload) {
        state.user = payload
    },
    setProfilePicture(state, payload) {
        state.user.profile_picture = payload[0]
    },
    setErrorMessage(state, payload) {
        state.errorMessage = payload
    },
    setEditPasswordError(state, payload) {
        state.editPasswordError = payload
    }
}

export const actions = {
    async postUserProfile({ rootGetters, commit }, payload) {
        try {
            const data = await this.$axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/upload', payload, {
                headers: {
                    "Authorization": `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
            commit("setProfilePicture", data.data)
        } catch (error) {
            console.log(error);
        }

    },
    async ediUserProfile({ rootGetters }, payload) {
        try {
            const data = await this.$axios.patch('https://storytime-api.strapi.timedoor-js.web.id/api/users/me', payload, {
                headers: {
                    "Authorization": `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    async getUserProfile({ commit }, payload) {
        try {
            const { data } = await this.$axios.get('https://storytime-api.strapi.timedoor-js.web.id/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${payload}`
                }
            })
            commit("setUserData", data.data)
        } catch (error) {
            console.log(error);
        }
    },
    async deleteUserImageProfile({ rootGetters }, payload) {
        try {
            const { data } = await this.$axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/upload/files/${payload}`, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    async resetPassword({rootGetters, commit}, payload) {
        try {
            const { data } = await this.$axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/users/me/reset-password', payload, {
                headers: {
                    'Authorization': `Bearer ${rootGetters["auth/getToken"]}`
                }
            })
            commit("setEditPasswordError", { isError: false, message: "Successfully update password" })
        } catch (error) {
            const response = error.response.data
            commit("setEditPasswordError", { isError: true, message: response.error.message })
        }
    }
}