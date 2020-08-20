<template>
    <div class="state">
        <div :style="{ width: tweenedNumber + 'px' }" class="bar">
            <span>{{ tweenedNumber.toFixed(0) }}</span>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
    name: 'State',
    data() {
        return {
            number: 0,
            tweenedNumber: 0
        }
    },
    watch: {
        // watching the number to update
        number(newValue) {
            gsap.to(this.$data, {
                duration: 1,
                ease: 'circ.out',
                tweenedNumber: newValue
            })
        }
    },
    methods: {
        randomNumber() {
            this.number = Math.floor(Math.random() * (800 - 0))
        }
    },
    created() {
        setInterval(this.randomNumber, 1500)
    }
}
</script>

<style scoped>
.state {
    margin-top: 2em;
}

.bar {
    padding: 5px;
    background-color: #2c3e50;
    border: 1px #16c0b0 solid;
    min-width: 20px;
}

.bar span {
    color: white;
}
</style>