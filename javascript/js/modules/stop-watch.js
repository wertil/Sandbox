function StopWatch() {
    let duration = 0
    let started = false
    let endTime = null
    let startTime = null

    this.start = function () {
        if (started)
            throw new Error("you already started the watch")

        startTime = new Date()
        started = true

    }

    this.stop = function () {
        if (!started)
            throw new Error("the clock is stopped already")
        started = false
        endTime = new Date
        const seconds = (endTime.getTime() - startTime.getTime()) / 1000
        duration = seconds
    }

    this.reset = () => {
        duration = 0
        startTime = null
        running = false
        endTime = null
    }

    Object.defineProperty(this, 'duration', {
        get: () => duration
    })


}

let sw = new StopWatch();