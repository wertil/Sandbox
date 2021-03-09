<template>
    <h1>Composition API with imports</h1>
    <div>{{ capacity }}</div>
    <button @click="increaseCapacity">Increase Capacity</button>
    <ul>
        <li v-for="attendee in attending" :key="attendee"> {{ attendee }}</li>
    </ul>
    <p>spaces left: {{ spacesLeft }}</p>
    <p style="margin-bottom: 5rem">{{ message }}</p>
</template>

<script>
import useEventSpace from "@/use/composition-function";
import testFunction from "@/use/composition-function2";

export default {
    name: "CompositionAPI_Import",
    props: {
        message: {
            type: String,
            default: "I'm a prop message"
        },
    },
    /*
    setup executes before Components, Props, Data, Methods, Computed props, lifecyle methods
    does not have access to this
    */
    setup() {
        //Vue best practice: show objects being received from composition function
        const { capacity, attending, spacesLeft, increaseCapacity } = useEventSpace();
        const {test} = testFunction();

        return {capacity, attending, spacesLeft, increaseCapacity, test}

    },

/*    setup_alternative_syntax() {

        // return useEventSpace();
        return {...useEventSpace(), ...testFunction()}

    }*/

}


</script>

<style scoped>

</style>