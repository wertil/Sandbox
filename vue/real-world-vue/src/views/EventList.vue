<template>
  <div>
    <h1>Events Listing for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }"
        >Prev Page</router-link
      >|
    </template>
    <router-link
      v-if="page < totalCount / resultPerPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventList',
  data() {
    return {
      resultPerPage: 4
    }
  },
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: this.resultPerPage,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'totalCount', 'user'])
  }
}
</script>
