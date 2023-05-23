<template>
  <div>
    <k-list inset-ios strong-ios>
      <k-list-input
        label="Nama Pelanggan"
        type="text"
        @input="e => form.name = e.target.value"
        :error="validationErrors?.name ? validationErrors?.name[0] : ''"
        placeholder="Nama Pelanggan"
        autocomplete="false">
      </k-list-input>

      <k-list-input
        label="File Import (XlXS)"
        type="file"
        ref="fileRef"
        autocomplete="false">
      </k-list-input>
    </k-list>

    <k-block class="space-y-4">
      <k-button large @click="importBukuKas(fileRef)" :disabled="loading">Import</k-button>
    </k-block>
  </div>
</template>

<script setup>
import {
  kList,
  kListInput,
  kBlock,
  kButton,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';
import { useImportStore } from '~/stores/import';

const fileRef = ref(null);

const indexStore = useIndexStore();
const { validationErrors, loading } = storeToRefs(indexStore);

const importStore = useImportStore();
const { formImportBukuKas: form } = storeToRefs(importStore);
const { importBukuKas } = importStore;
</script>
