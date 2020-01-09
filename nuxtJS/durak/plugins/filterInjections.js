import Vue from 'vue';

Vue.filter("lowercase", (value) => {
    if (typeof value === "string") {
        return value.toLowerCase();
    }
    return value;
});