<script lang="ts" setup>
const isLoggedIn = useIsLoggedIn();
definePageMeta({
  layout: 'plain',
})

function login() {
  isLoggedIn.value = true;
  useRouter().push('/')
}
</script>

<template>
  <form @submit.preven="login"> 
    <h1>Login</h1>

    <label for="username">Username</label>
    <input type="text" id="username">

    <label for="password">Password</label>
    <input type="password" id="password">

    <button>Login</button>
  </form>
</template>

<style scoped></style>
