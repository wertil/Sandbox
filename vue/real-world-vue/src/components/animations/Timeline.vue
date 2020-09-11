<template>
    <div class="timeline">
        <div alt="runner" class="runner first" >1</div>
        <div alt="runner" class="runner second" >2</div>
        <div alt="runner" class="runner third" >3</div>
    </div>

</template>

<script>
import gsap from 'gsap'

export default {
    name: "Timeline",
    data() {
        return {
            duration: 0
        }
    },
    mounted() {
        let tl = gsap.timeline({ repeat: -1 }) // { repeat: -1 }: infinite loop
        tl.to('.first', {x: 700, duration: 2, ease: 'expo.out'})
        tl.to('.second', {x: 700, duration: 2, ease: 'expo.out'}, 0.5) // starts 0.5s after start of timeline
        tl.to('.third', {x: 700, duration: 2, ease: 'expo.out'}, '<.5') // <:starts at the beginning of the previous

        this.duration = tl.duration()
    }
}
</script>

<style scoped>

    .runner {
        width: 2em;
        height: 2em;
        border-radius: 50%;
        margin: 0.2em;
        background: deeppink;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
    }
</style>