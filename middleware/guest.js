export default function ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
    // check if login testss
        return redirect("/");
    }
   
}