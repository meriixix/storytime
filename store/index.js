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
                commit("auth/setToken", token)
                commit("user/setUserData", data.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}