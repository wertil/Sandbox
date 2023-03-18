<template>
    <div class="settings" :class="{ open: isSettingsOpen }">
        <Button icon="pi pi-cog" class="p-button-icon" @click="isSettingsOpen = !isSettingsOpen" />
        <div class="panel">

            <div class="mode">
                <span>Follow System Theme: </span>
                <Checkbox id="system" name="system" v-model="isFollowSystemTheme" :binary="true"  />
            </div>

            <div :class="['mode', {inactive: isFollowSystemTheme}]">
                <span>Dark Mode: </span>
                <ToggleButton  v-model="isDarkMode" onIcon="pi pi-check" offIcon="pi pi-times" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import ToggleButton from "primevue/togglebutton";
import { onMounted } from 'vue';
import {CssClasses} from "~/models/cssClasses";

const isSettingsOpen = ref(false);

const isDarkMode = ref(false);
const isFollowSystemTheme = ref(true);


function getMediaPreference() {
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    isDarkMode.value = true;
  }
}

onMounted(() => {
 getMediaPreference();
});

watch([isDarkMode, isFollowSystemTheme], ([isDarkMode, isFollowSystemTheme], oldValue) => {
    console.log("isDarkMode, isFollowSystemTheme out", isDarkMode, isFollowSystemTheme)
    if(isFollowSystemTheme) {
        document.body.classList.remove(CssClasses.lightTheme);
        document.body.classList.remove(CssClasses.darkTheme);
        return;
    }

    if(isDarkMode) {
       document.body.classList.add(CssClasses.darkTheme);
       document.body.classList.remove(CssClasses.lightTheme);
       isFollowSystemTheme = false;
    } else {
        document.body.classList.add(CssClasses.lightTheme);
        document.body.classList.remove(CssClasses.darkTheme);
        isFollowSystemTheme = true;
    }


}, { immediate: false})

</script>

<style scoped lang="scss">
$settingsWidth: 200px;

.settings {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    transform: translateX($settingsWidth);
    transition: transform ease-in-out 0.2s;

    &.open {
        transform: translateX(0);
    }

    .panel {
        width: $settingsWidth;
        height: 100%;
        padding: 1rem;
        border: 1px solid black;
    }

    .mode {
        display: flex;
        align-items: center;

        &.inactive {
            opacity: 0.5;
            pointer-events: none;
        }

        span {
            padding-right: .5rem;
        }
    }
}
</style>