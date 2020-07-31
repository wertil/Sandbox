<template>
  <div v-for="">
    <notification-bar />
    <NavBar

  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar, NotificationBar},
  data() {
    return {
      key: value
    }
  },
}
</script>

<style scoped>

</style>