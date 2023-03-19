<script setup>
const pageTitle = 'My movie site';
useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - ${pageTitle}` : pageTitle,
})
</script>

<template>
  <div class="frame">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>

  </div>
</template>

<style>
body {
  background: black;
  color: white;
  font-size: 1.3rem;
  padding: 1rem;
}

.frame {
  width: 100%;
}

a {
  color: cornflowerblue;
  padding-right: 0.5rem;
}
</style>
