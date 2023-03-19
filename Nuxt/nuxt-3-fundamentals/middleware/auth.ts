export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useIsLoggedIn();
    if (!isLoggedIn) {
       return navigateTo({name: 'login'})
     }
})
