export const useIndexStore = definePiniaStore('index', {
  state: () => {
    return {
      loading: false,
      errors: null,
      success: null,
      validationErrors: null,
      isFound: true,
    };
  },
  actions: {
    setLoading(val) {
      this.loading = val;
    },
    setErrors(val) {
      this.errors = val;
    },
    setSuccess(val) {
      this.success = val;
    },
    setValidationErrors(val) {
      this.validationErrors = val;
    },
    setIsFound(val) {
      this.isFound = val;
    }
  }
});
