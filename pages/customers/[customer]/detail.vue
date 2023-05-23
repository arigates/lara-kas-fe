<template>
  <div>
    <k-card>
      <div class="grid grid-cols-1">
        <div>Total Hutang <kBadge class="rounded-md" :colors="{ bg: 'bg-gray-400' }">{{ customer.name }}</kBadge> ke <kBadge class="rounded-md" :colors="{ bg: 'bg-gray-400' }">Saya</kBadge></div>
      </div>

      <div class="grid grid-cols-2 mt-2">
        <div class="grid-span-1">
          <p class="text-lg font-black">
            {{ useFormatCurrency(customer.ar_ap_balance) }}
          </p>
        </div>

        <div class="grid-span-1">

        </div>
      </div>
    </k-card>

    <k-list strong v-if="!loading">
      <k-list-item class="bg-gray-200 ios:top-11-safe material:top-16-safe sticky z-20">
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
        <k-list-item @click="showModalDeleteArAp(ArAp.id)">
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

    <k-dialog
      :opened="modalDelete"
      @backdropclick="() => (modalDelete = false)"
    >
      <template #title>Hapus Transaksi</template>
      Transaksi yang telah dihapus tidak bisa dikembalikan. Yakin ingin menghapus data transaksi ini?

      <template #buttons>
        <k-dialog-button @click="deleteArAp" :disabled="loading">
          Ya
        </k-dialog-button>
        <k-dialog-button @click="hideModalDeleteArAp">
          Tidak
        </k-dialog-button>
      </template>
    </k-dialog>
  </div>
</template>

<script setup>
import {
  kCard,
  kList,
  kListItem,
  kBadge,
  kDialog,
  kDialogButton,
} from 'konsta/vue';
import { useIndexStore } from '~/stores';

import { useArApStore } from '~/stores/ar-ap';
import { useCustomerStore } from '~~/stores/customer';

definePageMeta({
  middleware: ['auth', 'me'],
  layout: 'customer-detail'
});

const route = useRoute();
const { customer: customerId } = route.params;

const indexStore = useIndexStore();
const { loading } = indexStore;

const customerStore = useCustomerStore();
const { ArAps, customer } = storeToRefs(customerStore);
const { getCustomerArAp, getCustomer } = customerStore;

const ArApStore = useArApStore();
const { modalDelete } = storeToRefs(ArApStore);
const { setModalDelete, setArApIdToDelete, deleteArAp } = ArApStore;

await getCustomer(customerId);
await getCustomerArAp(customerId);

function showModalDeleteArAp(id) {
  setModalDelete(true);
  setArApIdToDelete(id);
}

function hideModalDeleteArAp() {
  setModalDelete(false);
  setArApIdToDelete('');
}
</script>
