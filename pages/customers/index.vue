<template>
  <div>
    <k-card>
      This is a simple card with plain text, but cards can also contain their
      own header, footer, list view, image, or any other element.
    </k-card>
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
} from 'konsta/vue';
import { useIndexStore } from '~/stores';

import { useCustomerStore } from '~~/stores/customer';

definePageMeta({
  middleware: ['auth', 'me']
});

const indexStore = useIndexStore();
const { loading } = storeToRefs(indexStore);

const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);
const { getCustomers } = customerStore;

await getCustomers();
</script>
