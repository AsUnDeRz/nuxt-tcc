export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if an user is authenticated
  const isLogin = true;
  if (isLogin === false) {
    return navigateTo("/login");
  }
});
