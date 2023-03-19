<template>
  <p>
   Team: {{ teamSlug }}
  </p>
  <p>
    User Id:  {{ $route.params.userId }}
  </p>
</template>

<script setup>
const route = useRoute();

const teamSlug = computed(() => route.params.teamSlug);
</script>
