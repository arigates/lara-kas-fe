<template>
  <k-app theme="ios">
    <k-page>
      <k-tabbar class="left-0 bottom-0 fixed p-4">
        <k-tabbar-link>
          <k-button
            @click="$router.push({
              path: '/ar-ap/create',
              query: {
                type: 'ar',
                customer_id: customer.id,
              }
            })"
            class="bg-rose-300 text-gray-600 font-bold capitalize pr-4 pl-4" large rounded>
            Saya Memberi
          </k-button>
        </k-tabbar-link>
        <k-tabbar-link>
          <k-button
            @click="$router.push({
              path: '/ar-ap/create',
              query: {
                type: 'ap',
                customer_id: customer.id,
              }
            })"
            class="bg-green-300 text-gray-600 font-bold capitalize pr-4 pl-4" large rounded>
            Saya Menerima
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
import { useCompanyStore } from '~/stores/company';
import { useCustomerStore } from '~/stores/customer';

const companyStore = useCompanyStore();
const { loggedInUserCompany } = storeToRefs(companyStore);
const { getLoggedInUseCompany } = companyStore;

const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);

await getLoggedInUseCompany();
</script>
