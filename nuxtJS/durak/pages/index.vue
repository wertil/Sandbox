<template>
  <!-- <div class="container">
    <nuxt-link to="/users">users</nuxt-link>
    <button @click="$router.push('/products')">products</button>
  </div> -->

  <Durak />

</template>

<script>
import Logo from '~/components/Logo.vue'
import Durak from '~/pages/durak/index.vue'

export default {
  components: {
    Logo, Durak
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
