<template>
  <div>
    <k-card>
      <div class="grid grid-cols-1">
        <div>Total Hutang <kBadge class="rounded-md" :colors="{ bg: 'bg-gray-400' }">{{ customer.name }}</kBadge></div>
      </div>

      <div class="grid grid-cols-2 mt-2">
        <div class="grid-span-1">
          <p class="text-lg font-black">
            {{ useFormatCurrency(customer.ar_ap_balance) }}
          </p>
        </div>
      </div>
    </k-card>

    <k-block class="text-center" v-if="loading">
      <k-preloader />
    </k-block>

    <k-list strong v-if="!loading">
      <k-list-item class="bg-gray-200 dark:bg-gray-600 ios:top-0-safe sticky z-20">
        <template #title>
          <div class="text-sm">
            Catatan
          </div>
        </template>
        <template #after>
          <div class="flex flex-row space-x-5 w-[200px] text-sm">
            <div class="w-1/2 text-center">Menerima</div>
            <div class="w-1/2 text-center">Memberi</div>
          </div>
        </template>
      </k-list-item>

      <template v-for="ArAp in ArAps" :key="ArAp.id">
        <k-list-item>
          <template #title>
            <div class="flex flex-col text-sm">
              <div>
                {{ ArAp.description }}
              </div>
              <div class="text-xs">
                {{ ArAp.date }}
              </div>
            </div>

          </template>

          <template #after>
            <div class="flex flex-row space-x-5 w-[200px]">
              <div class="w-1/2 text-sm text-blue-600 text-right">
                {{ ArAp.ap === 0 ? '-' : useFormatCurrency(ArAp.ap) }}
              </div>
              <div class="w-1/2 text-sm text-rose-600 text-right">
                {{ ArAp.ar === 0 ? '-' : useFormatCurrency(ArAp.ar) }}
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
  kCard,
  kList,
  kListItem,
  kBadge,
  kBlock,
  kPreloader,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';

import { useArApStore } from '~/stores/ar-ap';
import { useCustomerStore } from '~~/stores/customer';

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Laporan Hutang Pelanggan',
});

const route = useRoute();
const { customer: customerId } = route.params;

const indexStore = useIndexStore();
const { loading } = indexStore;

const customerStore = useCustomerStore();
const { ArAps, customer } = storeToRefs(customerStore);
const { getCustomerArApPublic, getCustomerPublic } = customerStore;

const ArApStore = useArApStore();
const { modalDelete } = storeToRefs(ArApStore);
const { setModalDelete, setArApIdToDelete, deleteArAp } = ArApStore;

getCustomerPublic(customerId);
getCustomerArApPublic(customerId);

function showModalDeleteArAp(id) {
  setModalDelete(true);
  setArApIdToDelete(id);
}

function hideModalDeleteArAp() {
  setModalDelete(false);
  setArApIdToDelete('');
}
</script>
