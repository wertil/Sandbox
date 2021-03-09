<template>
    <h1>Composition API Reactive Syntax</h1>
    <div>{{ capacity }}</div>
    <button @click="increaseCapacity">Increase Capacity</button>
    <ul>
        <li v-for="attendee in attending" :key="attendee"> {{ attendee }}</li>
    </ul>
    <p>spaces left: {{ spacesLeft }}</p>
    <p>{{ message }}</p>
</template>

<script>
import {computed, reactive, toRefs, ref, watchEffect} from "vue"

export default {
    name: "CompositionAPI_Reactive",
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

        // data properties
        // ref turns the primitive into an reactive object
        const capacity2 = ref(3)
        const attending2 = ref(["tim", "joe", "bob"])

        // alternative reactive syntax
        const event = reactive({
            capacity: 4,
            attending: ["timi", "joe", "bob"],
            spacesLeft: computed(() => event.capacity - event.attending.length),
            increaseCapacity: () => {
                event.capacity++;
            }
        })


        // computed property
        const spacesLeft2 = computed(() => {
            return capacity2.value - attending2.value.length
        })

        // method
        function increaseCapacity() {
            capacity2.value++;
        }


        // watch multiple reactive properties and I don't care about old values
        // https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect
        watchEffect(() => {
            console.log(props.message, context)
        })

        /*    return all item that you want to use in the template
             toRefs:  to prevent having to write "event." before each property in the template
                       converts a reactive object to a plain object, where each property is a reactive reference
                       pointing to the property pointing to the property on the original object
                       without computed prop (increased capacity) this works too: "toRefs(event)"
                       */
        return {capacity2, increaseCapacity, attending2, spacesLeft2, ...toRefs(event)}

    }
}
</script>

<style scoped>

</style>