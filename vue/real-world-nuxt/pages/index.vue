<template>
    <div>
        <h1>Events</h1>
        <EventCard v-for="(event, index) in events" :key="index" :event="event" :data-index="index"/>
    </div>
</template>

<script>


import EventCard from "~/components/EventCard";

export default {
    components: {EventCard},
    // method for vue-meta
    head() {
        return {
            title: 'Event Listing '
        }
    },
    // $axios destructured out of the context object
    asyncData({$axios, error}) {
        return $axios.get('http://localhost:3333/events').then(response => {
            return {
                events: response.data
            }
        }).catch(e => {
            error({
                statusCode: 503,
                message: 'Unable to fetch events. Please try again later.'
            })
        })
    }

}
</script>
