<template>
    <ControlsNavBar
        :tab-items="navBarItems"
    >
        <ControlsNavBarItem
            v-for="item in navBarItems"
            :key="item.id"
            :class="{ active : item.isActive }"
            @click="setActiveNavTabBarItem(item.id)"
        >
            <NuxtLink :to="item.page">{{ item.name }}</NuxtLink>
        </ControlsNavBarItem>
    </ControlsNavBar>
</template>

<script lang="ts" setup>

interface NavBarItem {
    id: number,
    name: string,
    page?: string,
    isActive: boolean,
    color?: string,
}

const navBarItems = ref<NavBarItem[]>([
    {
        id: 1,
        name: 'Home',
        page: '/',
        isActive: true,
        color: '#000',
    },
    {
        id: 2,
        name: 'Countdown',
        page: 'Countdown',
        isActive: true,
        color: '#000',
    },
    {
        id: 3,
        name: 'Locations',
        page: 'Locations',
        isActive: false,
        color: '#ccc',
    },
]);

function setActiveNavTabBarItem(id: number): void {
    navBarItems.value.forEach(item => {
        item.isActive = item.id === id;
    });
}
</script>

<style lang="scss" scoped>

a {
    color: var(--text-color);
    text-decoration: none;
}

</style>