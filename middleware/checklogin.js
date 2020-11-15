export default function ({ store, redirect }) {
    //check login
    if (!store.state.auth.loggedIn) {
        return redirect("/login");
    }
   
}