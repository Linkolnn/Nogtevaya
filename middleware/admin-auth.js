export default defineNuxtRouteMiddleware((to, from) => {
    // Skip middleware if the page is the login page
    if (to.path === '/admin/login') {
        return;
    }
    
    // Check if running on client side
    if (process.client) {
        // Check if user is authenticated
        const isAuthenticated = document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .some(cookie => cookie.startsWith('adminAuthenticated=true'));
        
        // If not authenticated, redirect to login page immediately
        if (!isAuthenticated) {
            return navigateTo('/admin/login', { replace: true });
        }
    } else {
        // If running on server side, always redirect to login
        // to ensure proper authentication check on client
        return navigateTo('/admin/login');
    }
}); 