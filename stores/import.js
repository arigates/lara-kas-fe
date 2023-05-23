export const useImportStore = definePiniaStore('import', {
  state: () => {
    return {
      formImportBukuKas: {
        name: '',
      }
    };
  },
  actions: {
    async importBukuKas(fileRef) {
      const formData = new FormData();
      formData.append('name', this.formImportBukuKas.name);
      formData.append('file', fileRef.inputElRef.files[0]);

      const { data } = await useBaseFetch('/import-buku-kas', {
        method: 'POST',
        body: formData,
      });

      if (data.value) {
        this.clearFormImportBukuKas();

        useRouter().push('/customers');
      }
    },
    clearFormImportBukuKas() {
      this.formImportBukuKas = {
        name: '',
        file: null
      };
    }
  }
});
