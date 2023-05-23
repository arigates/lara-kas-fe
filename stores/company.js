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
      totalArAp: {
        totalAr: 0,
        totalAp: 0,
      }
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
    },
    async getTotalArAp() {
      const { data } = await useBaseFetch(`/companies/${this.loggedInUserCompany.id}/total-ar-ap`, {
        method: 'GET',
      });

      if (data.value) {
        const response = data.value?.data;

        this.totalArAp = {
          totalAp: response?.ap_total || 0,
          totalAr: response?.ar_total || 0,
        };
      }
    }
  }
});
