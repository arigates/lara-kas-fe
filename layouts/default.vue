<template>
  <k-app theme="ios">
    <k-page>
      <k-toolbar
        :top="isTop"
        :class="`left-0 ${
          isTop ? 'ios:top-11-safe material:top-14-safe sticky' : 'bottom-0 fixed'
        } w-full`"
      >
        <k-link @click="$router.push('/')" toolbar>Home</k-link>
        <k-link @click="$router.push('/customers')" toolbar>Hutang</k-link>
        <k-link @click="$router.push('/others')" toolbar>Lainnya</k-link>
      </k-toolbar>
      <k-navbar :title="loggedInUserCompany.name"></k-navbar>
      <NuxtPage />
    </k-page>
  </k-app>
</template>

<script setup>
import {
  kApp,
  kPage,
  kNavbar,
  kToolbar,
  kLink,
} from 'konsta/vue';
import { useCompanyStore } from '~/stores/company';

const isTop = ref(false);

const companyStore = useCompanyStore();
const { loggedInUserCompany } = storeToRefs(companyStore);
const { getLoggedInUseCompany } = companyStore;

await getLoggedInUseCompany();
</script>
