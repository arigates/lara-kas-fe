export const useCompanyStore = definePiniaStore('company', {
  state: () => {
    return {
      loggedInUserCompany: {
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
      },
    };
  },
  actions: {
    async getLoggedInUseCompany() {
      const { data } = await useBaseFetch('/companies', {
        method: 'GET',
      });

      if (data.value) {
        const company = data.value?.data[0];

        this.loggedInUserCompany.id = company?.id;
        this.loggedInUserCompany.name = company?.name;
      }
    }
  }
});
