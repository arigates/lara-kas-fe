<template>
  <div>
    <k-block-title>{{ form.type === 'ar' ? 'Saya memberikan sebesar' : 'Saya menerima sebesar' }}</k-block-title>
    <k-list inset-ios strong-ios>
      <k-list-input
        label="Nominal"
        type="text"
        @input="e => form.nominal = e.target.value"
        :error="validationErrors?.nominal ? validationErrors.nominal[0] : ''"
        placeholder="Harus lebih besar dari 0"
        autocomplete="false"
        required
      />

      <k-list-input
        label="Tanggal"
        type="date"
        :value="form.date"
        @input="e => form.date = e.target.value"
        :error="validationErrors?.date ? validationErrors.date[0] : ''"
        autocomplete="false"
        required
      />

      <k-list-input
        label="Keterangan"
        type="text"
        @input="e => form.description = e.target.value"
        :error="validationErrors?.description ? validationErrors.description[0] : ''"
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
import { useArApStore } from '~/stores/ar-ap';

definePageMeta({
  middleware: ['auth'],
  layout: 'create-ar-ap'
});

const indexStore = useIndexStore();
const { validationErrors } = storeToRefs(indexStore);

const ArApStore = useArApStore();
const { form } = storeToRefs(ArApStore);

const route = useRoute();
form.value.type = route.query?.type || '';
form.value.customer_id = route.query?.customer_id || '';
</script>
