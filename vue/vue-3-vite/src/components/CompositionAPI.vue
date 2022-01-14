<template>
    <h1>Composition API</h1>
    <div class="section">
        <input type="text" v-model="searchInput" @keyup.enter="loadCountry">
        <div>Loading: {{ loading }}</div>
        <div>Error: {{ error }}</div>
        <div>capital: {{ capital }}</div>
    </div>
    <div>{{ capacity }}</div>
    <button @click="increaseCapacity">Increase Capacity</button>
    <ul>
        <li v-for="attendee in attending" :key="attendee"> {{ attendee }}</li>
    </ul>
    <p>spaces left: {{ spacesLeft }}</p>
    <p style="margin-bottom: 5rem">{{ message }}</p>
</template>

<script>
import {onBeforeMount, onMounted, watchEffect, ref, computed, watch} from "vue"
import RestCountries from "../api/rest-countries"

export default {
    name: "CompositionAPI",
    props: {
        message: {
            type: String,
            default: "I'm a prop message"
        },
    },
    /*
    setup executes before Components, Props, Data, Methods, Computed props, lifecyle methods
    does not have access to this
    optional second argument is context (properties previously accessed by this
    context.attrs, context.slots, context.parent, context.root, context.emit
    */
    setup(props, context) {


        onBeforeMount(() => {
            console.log("Before Mount")
        })

        onMounted(() => {
            console.log("Mounted!")
        })

        const searchInput = ref("");
        const capital = ref(null);
        const loading = ref(false);
        const error = ref(null);

        async function loadCountry() {
          try {
                const response = await RestCountries.getCountryByName(searchInput.value)
                capital.value = response.data[0].capital
            } catch (err) {
                error.value = err;
            } finally {
                 loading.value = false
            }
        }


        watch(searchInput, () => {
            if(searchInput.value !== "") {
                console.log(searchInput.value)
            }
        })


        // watch multiple reactive properties and I don't care about old values
        // runs on next tick
        // https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect
        watchEffect(() => {
            console.log(props.message, context)
        })

        return {...useEventSpace(), capital, error, loading, searchInput, loadCountry};

    }
}

// moved functionality into a composition function -> organizes component by feature
function useEventSpace() {
    // data properties
    // ref turns the primitive into an reactive object
    const capacity = ref(3)
    const attending = ref(["tim", "joe", "bob"])

    // computed property
    const spacesLeft = computed(() => {
        return capacity.value - attending.value.length
    })

    // method
    function increaseCapacity() {
        capacity.value++;
    }

    /*    return all item that you want to use in the template */
    return {capacity, increaseCapacity, attending, spacesLeft}
}


</script>

<style scoped>
.section {
    margin-bottom: 2rem;
    text-align: left;
    line-height: 1.3;
}

</style>