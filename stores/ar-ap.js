export const useArApStore = definePiniaStore('ar-ap', {
  state: () => {
    return {
      form: {
        customer_id: '',
        type: '',
        date: new Date().toISOString().slice(0, 10),
        nominal: '',
        description: '',
      },
      modalDelete: false,
      ArApIdToDelete: '',
    };
  },
  actions: {
    async createArAp() {
      const { data } = await useBaseFetch('/ar-ap', {
        method: 'POST',
        body:JSON.stringify(this.form)
      });

      if (data.value) {
        this.clearForm();

        useRouter().back();
      }
    },
    async deleteArAp() {
      if (this.ArApIdToDelete === '') {
        return;
      }

      const { data } = await useBaseFetch(`/ar-ap/${this.ArApIdToDelete}`, {
        method: 'DELETE'
      });

      if (data.value) {
        this.setModalDelete(false);
        this.setArApIdToDelete('');

        window.location.reload();
      }
    },
    clearForm() {
      this.form = {
        customer_id: '',
        type: '',
        date: new Date().toISOString().slice(0, 10),
        nominal: '',
        description: '',
      };
    },
    setModalDelete(val) {
      this.modalDelete = val;
    },
    setArApIdToDelete(val) {
      this.ArApIdToDelete = val;
    }
  }
});
