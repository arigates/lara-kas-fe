<template>
  <k-app theme="ios">
    <k-page>
      <k-tabbar class="left-0 bottom-0 fixed p-4">
        <k-tabbar-link class="w-full">
          <k-button
            @click="createArAp"
            class="w-full font-bold capitalize pr-4 pl-4" :disabled="loading" large rounded>
            Simpan Transaksi
          </k-button>
        </k-tabbar-link>
      </k-tabbar>

      <k-navbar :title="loggedInUserCompany.name">
        <template #left>
          <k-navbar-back-link text="Back" @click="$router.back()" />
        </template>
      </k-navbar>
      <NuxtPage />
    </k-page>
  </k-app>
</template>

<script setup>
import {
  kApp,
  kPage,
  kNavbar,
  kNavbarBackLink,
  kTabbar,
  kTabbarLink,
  kButton,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';
import { useArApStore } from '~/stores/ar-ap';
import { useCompanyStore } from '~/stores/company';

const indexStore = useIndexStore();
const { loading } = storeToRefs(indexStore);

const companyStore = useCompanyStore();
const { loggedInUserCompany } = storeToRefs(companyStore);
const { getLoggedInUseCompany } = companyStore;

const ArApStore = useArApStore();
const { createArAp } = ArApStore;

await getLoggedInUseCompany();
</script>
