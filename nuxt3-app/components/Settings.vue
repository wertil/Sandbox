<template>
    <div class="settings" :class="{ open: isSettingsOpen }">
        <Button icon="pi pi-cog" class="p-button-icon" @click="isSettingsOpen = !isSettingsOpen" />
        <div class="panel">
            <div class="mode">
                <span>Dark Mode: </span>
                <ToggleButton v-model="isDarkMode" onIcon="pi pi-check" offIcon="pi pi-times" />
            </div>
            <div class="mode">
                <span>Follow System Theme: </span>
                <Checkbox id="system" name="system" v-model="isFollowSystemTheme" :binary="true"  />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import ToggleButton from "primevue/togglebutton";
import { onMounted } from 'vue';

const isSettingsOpen = ref(false);

const isDarkMode = ref(false);
const isFollowSystemTheme = ref(true);


function getMediaPreference() {
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (hasDarkPreference) {
    isDarkMode.value = true;
    return "dark-theme";
  } else {
    return "light-theme";
  }
}

onMounted(() => {
 getMediaPreference();
});

watch(isDarkMode, () => {
  if(isDarkMode.value) {
     document.body.classList.add("dark-theme");
     document.body.classList.remove("light-theme");
     isFollowSystemTheme.value = false;
  } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      isFollowSystemTheme.value = false;
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

        span {
            padding-right: .5rem;
        }
    }
}
</style>