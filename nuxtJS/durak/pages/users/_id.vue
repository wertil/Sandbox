<template>
    <h1>a single user width ID: {{ $route.params.id }}</h1>
</template>

<script>
export default {
    validate(data) {
        // only show page if parameter is a number:
        return /^\d+$/.test(data.params.id);
    }
}
</script>