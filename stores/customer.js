import { useCompanyStore } from './company';

export const useCustomerStore = definePiniaStore('customer', {
  state: () => {
    return {
      customers: [],
      customer: {
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        ar_balance: 0,
        ap_balance: 0,
        ar_ap_balance: 0,
      },
      ArAps: [],
    };
  },
  actions: {
    async getCustomers() {
      const companyStore = useCompanyStore();
      const { loggedInUserCompany } = storeToRefs(companyStore);

      const { data } = await useBaseFetch('/customers', {
        method: 'GET',
        query: {
          company_id: loggedInUserCompany.id
        }
      });

      if (data.value) {
        this.customers = data.value?.data || [];
      }
    },
    async getCustomer(customerId) {
      const { data } = await useBaseFetch(`/customers/${customerId}`, {
        method: 'GET'
      });

      if (data.value) {
        const customer = data.value?.data;
        this.customer = customer;
      }
    },
    async getCustomerArAp(customerId) {
      const { data } = await useBaseFetch('/ar-ap', {
        method: 'GET',
        query: {
          customer_id: customerId
        }
      });

      if (data.value) {
        this.ArAps = data.value?.data || [];
      }
    }
  }
});
