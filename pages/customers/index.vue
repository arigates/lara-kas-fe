<template>
  <div>
    <k-card>
      <div class="grid grid-cols-2">
        <div class="grid-span-1 p-2 text-center">
          <div class="border-b-2 border-stone-300 p-2">
            <div class="flex flex-col">
              <div class="text-xs text-gray-500">Utang Saya</div>
              <div class="text-lg font-bold text-blue-600">
                {{ useFormatCurrency(totalArAp.totalAp) }}
              </div>
            </div>
          </div>
        </div>
        <div class="grid-span-1 p-2 text-center">
          <div class="border-b-2 border-stone-300 p-2">
            <div class="flex flex-col">
              <div class="text-xs text-gray-500">Utang Pelanggan</div>
              <div class="text-lg font-bold text-rose-600">
                {{ useFormatCurrency(totalArAp.totalAr) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1">
        <div>
          <k-button outline-ios large @click="$router.push('/customers/create')">Tambah Pelanggan</k-button>
        </div>
      </div>
    </k-card>

    <k-block class="text-center" v-if="loading">
      <k-preloader />
    </k-block>

    <k-list strong inset v-if="!loading">
      <template v-for="customer in customers" :key="customer.id">
        <k-list-item :title="customer.name" @click="$router.push(`/customers/${customer.id}/detail`)">
          <template #after>
            <div class="flex flex-col">
              <div class="text-xs">
                {{ useArApLabel(customer.ar_ap_balance) }}
              </div>

              <div class="text-right"
                :class="{'text-rose-600': customer.ar_ap_balance < 0, 'text-blue-600': customer.ar_ap_balance > 0}">
                {{ useFormatCurrency(customer.ar_ap_balance) }}
              </div>
            </div>
          </template>
        </k-list-item>
      </template>
    </k-list>
  </div>
</template>
<script setup>
import {
  kList,
  kListItem,
  kCard,
  kButton,
  kBlock,
  kPreloader,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';
import { useCompanyStore } from '~/stores/company';
import { useCustomerStore } from '~~/stores/customer';

definePageMeta({
  middleware: ['auth', 'me']
});

useHead({
  title: 'Data Pelanggan',
});

const indexStore = useIndexStore();
const { loading } = storeToRefs(indexStore);

const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);
const { getCustomers } = customerStore;

const companyStore = useCompanyStore();
const { totalArAp } = storeToRefs(companyStore);
const { getTotalArAp } = companyStore;

getCustomers();
getTotalArAp();
</script>
