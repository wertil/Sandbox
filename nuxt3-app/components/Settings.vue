<template>
    <div class="settings" :class="{open :  isSettingsOpen}">
        <Button icon="pi pi-cog" class="p-button-icon" @click="isSettingsOpen = !isSettingsOpen" />
        <div class="panel">
            Settings panel
        </div>
    </div>

</template>

<script setup lang="ts">
import Button from "primevue/button";

const isSettingsOpen = ref(false);

</script>

<style scoped lang="scss">
$settingsWidth: 100px;

    .settings {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: flex-start;
        transform: translateX($settingsWidth);
        transition: transform ease 0.1s;

        &.open {
            transform: translateX(0);
        }

    .panel {
        width: 100px;
        height: 100%;
        border: 1px solid black;
    }

    }

</style>