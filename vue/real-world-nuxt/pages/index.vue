<template>
    <div>
        <h1>Events</h1>
        <EventCard v-for="(event, index) in events" :key="index" :event="event" :data-index="index"/>
    </div>
</template>

<script>


import EventCard from "~/components/EventCard";

export default {
    name: "Events",
    components: {EventCard},
    // method for vue-meta
    head() {
        return {
            title: 'Event Listing '
        }
    },
    // "data" destructured out of the response object
    async asyncData({$axios, error}) {
        try {
            const {data} = await $axios.get('http://localhost:3333/events')
            return {
                events: data
            }
        } catch(e) {
            error({
                statusCode: 503,
                message: 'Unable to fetch events. Please try again later.'
            })
        }
    }

}
</script>
