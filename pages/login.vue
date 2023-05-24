<template>
  <k-page>
    <k-navbar title="Login"></k-navbar>
    <form autocomplete="off" @submit="login">
      <k-list inset-ios strong-ios>
        <k-list-input
          name="email"
          label="Email"
          type="email"
          @input="e => form.email = e.target.value"
          :error="validationErrors?.email"
          placeholder="Your Email"
        />

        <k-list-input
          name="password"
          label="Password"
          type="password"
          @input="e => form.password = e.target.value"
          :error="validationErrors?.password"
          placeholder="Your password"
        />
      </k-list>
      <k-block class="space-y-4">
        <k-button type="button" large @click="login" :disabled="loading">
          <div v-if="loading">
            <k-preloader></k-preloader>
          </div>
          <div v-else>
            Submit
          </div>
        </k-button>
      </k-block>
    </form>
  </k-page>
</template>

<script setup>
import {
  kPage,
  kNavbar,
  kList,
  kListInput,
  kButton,
  kBlock,
  kPreloader,
} from 'konsta/vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useIndexStore } from '~/stores/index';

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Login'
});

const indexStore = useIndexStore();
const { loading, validationErrors } = storeToRefs(indexStore);

const authStore = useAuthStore();
const { form } = storeToRefs(authStore);
const { login } = authStore;
</script>
