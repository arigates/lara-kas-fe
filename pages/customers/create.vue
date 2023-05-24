<template>
  <div>
    <k-block-title>Tambah Pelanggan Baru</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input
        label="Nama"
        type="text"
        @input="e => form.name = e.target.value"
        :error="validationErrors?.name ? validationErrors.name[0] : ''"
        autocomplete="false"
        required
      />

      <k-list-input
        label="Email"
        type="email"
        @input="e => form.email = e.target.value"
        :error="validationErrors?.email ? validationErrors.email[0] : ''"
        autocomplete="false"
      />

      <k-list-input
        label="No. HP"
        type="text"
        @input="e => form.phone = e.target.value"
        :error="validationErrors?.phone ? validationErrors.phone[0] : ''"
        autocomplete="false"
      />

      <k-list-input
        label="Alamat"
        type="text"
        @input="e => form.address = e.target.value"
        :error="validationErrors?.address ? validationErrors.address[0] : ''"
        autocomplete="false"
      />
    </k-list>
  </div>
</template>

<script setup>
import {
  kBlockTitle,
  kList,
  kListInput,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';
import { useCustomerStore } from '~/stores/customer';

definePageMeta({
  middleware: ['auth'],
  layout: 'create-customer'
});

useHead({
  title: 'Tambah Pelanggan',
});

const indexStore = useIndexStore();
const { validationErrors } = storeToRefs(indexStore);

const customerStore = useCustomerStore();
const { form } = storeToRefs(customerStore);
</script>
