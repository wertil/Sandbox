<template>
    <div>{{ capacity }}</div>
    <button @click="increaseCapacity">Increase Capacity</button>
    <p>{{ message }}</p>
</template>

<script>
import { watchEffect, ref } from "vue"

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

        // ref turns the primitive into an reactive object
        const capacity = ref(3)

        function increaseCapacity() {
            console.log(capacity)
            capacity.value++;
        }

        watchEffect( () => {
            console.log(props.message, context)
        })

        return { capacity, increaseCapacity }

    }
}
</script>

<style scoped>

</style>