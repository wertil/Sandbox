<template>
    <div class="container">
        <div>

          {{store.name}} {{ store.counter}}
          <Button type="submit" label="Add" @click="store.hit()"/>
            <Toast />

            <div >
                <form @submit.prevent="greet">
                    <InputText type="text" v-model="text"/>
                    <Button type="submit" label="Submit"/>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '~/store/mainStore'
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";

components: { Button }

const store = useStore();
const text = ref();
const toast = useToast();
const greet = () => {
    toast.add({severity: 'info', summary: 'Hello '  + text.value});
}


</script>

<style lang="scss">
.container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;
    }
}
</style>