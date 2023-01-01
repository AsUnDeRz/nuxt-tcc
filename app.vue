<template>
  <NuxtPage />
</template>

<script setup>
import { loadingKey } from "./key_injector";

const loading = ref(false);

function setLoading(value) {
  loading.value = value;
}

provide(loadingKey, {
  loading,
  setLoading,
});
</script>
