export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
        const token = localStorage.getItem("token")
        if (!token) {
            return navigateTo("/login")
        }
    }
});