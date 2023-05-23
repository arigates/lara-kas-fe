import { useAuthStore } from '~~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const token = authStore?.token || '';

  if (!token) {
    return useRouter().push('/login');
  }
});
