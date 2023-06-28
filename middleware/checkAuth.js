export default function ({store, redirect}) {
    const token = store.getters["auth/getToken"]
    if ( !token ) {
        return redirect("/")
    }
}