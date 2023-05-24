<template>
  <div>
    <k-block-title>Fitur lainnya</k-block-title>
    <k-list strong inset>
      <k-list-item @click="$router.push('/others/import-buku-kas')" title="Import dari Buku Kas" />
    </k-list>

    <k-block-title>Akun</k-block-title>
    <k-list strong inset>
      <k-list-item @click="logout" title="Keluar" />
    </k-list>
  </div>
</template>

<script setup>
import {
  kBlockTitle,
  kList,
  kListItem,
} from 'konsta/vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  middleware: ['auth', 'me']
});

useHead({
  title: 'Fitur Lainnya',
});

const authStore = useAuthStore();
const { logout } = authStore;
</script>
