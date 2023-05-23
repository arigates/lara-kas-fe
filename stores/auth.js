export const useAuthStore = definePiniaStore('auth', {
  state: () => {
    return {
      form: {
        email: '',
        password: '',
      },
      userMe: {
        name: '',
        email: '',
      },
      token: localStorage.getItem('token'),
    };
  },
  actions: {
    async login() {
      const { data } = await useBaseFetch('/login', {
        method: 'POST',
        body: JSON.stringify(this.form)
      });

      if (data.value) {
        const response = data.value;

        localStorage.setItem('token', response?.access_token);

        setTimeout(function () {
          location.replace('/');
        }, 0);
      }
    },
    logout() {
      this.token = null;

      localStorage.removeItem('token');

      useRouter().push('/login');
    },
    async me() {
      const { data } = await useBaseFetch('/user');
      this.userMe = data.value?.data;
    }
  }
});
