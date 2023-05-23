import { useIndexStore } from '~~/stores/index';
import { useAuthStore } from '~~/stores/auth';

export const useBaseFetch = (request, options) => {
  options = { ...options };
  // eslint-disable-next-line no-undef
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const indexStore = useIndexStore();
  const bearerToken = `Bearer ${authStore?.token}`;

  if (!Object.prototype.hasOwnProperty.call(options, 'headers')) {
    options.headers = {
      'Authorization': bearerToken,
      'Accept': 'application/json'
    };
  } else {
    options['headers']['Authorization'] = bearerToken;
    options['headers']['Accept'] = 'application/json';
  }

  if (options.initialCache === undefined) {
    options.initialCache = false;
  }

  return useFetch(request, {
    baseURL: config.public.baseURL,
    ...options,
    // eslint-disable-next-line no-unused-vars
    async onRequest({ request, options }) {
      indexStore.setErrors(null);
      indexStore.setLoading(true);
      indexStore.setValidationErrors(null);
      indexStore.setIsFound(true);
    },
    // eslint-disable-next-line no-unused-vars
    async onResponse({ request, response, options }) {
      indexStore.setLoading(false);
    },
    // eslint-disable-next-line no-unused-vars
    async onResponseError({ request, response, options }) {
      indexStore.setLoading(false);

      const data = response._data;
      if (response.status === 401) {
        authStore.logout();
      }

      if (response.status === 422) {
        indexStore.setValidationErrors(data?.errors);
      }

      if (response.status === 400 || response.status === 404 || response.status === 500) {
        indexStore.setErrors(data?.message);
      }

      if (response.status === 404) {
        indexStore.setIsFound(false);
      }
    }
  });
};
