let defaultArray = []
for (let i = 1; i < 101; i++) {
    defaultArray.push(i*2)
}


export const binarySearch = (value, array = defaultArray) => {

    let minSearchValue = 0
    let maxSearchValue = array.length - 1
    let targetPosition
    let steps = 0



        while ( minSearchValue <= maxSearchValue ) {

            targetPosition = Math.floor((minSearchValue + maxSearchValue) / 2)

            if(array[targetPosition] === value) {
                return `The value is at Position ${targetPosition}, steps: ${steps}`
            }

            if (array[targetPosition] < value) {
                minSearchValue = targetPosition + 1
            } else {
                maxSearchValue = targetPosition - 1
            }
            steps++

        }

    return  `The array doesn't contain the value, steps: ${steps}`


}


//
// Multiples of 3 and 5
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.
export const sumMultiples = () => {

    let sumMultiples = 0

    for(let i = 1; i < 1000; i++) {
        if((i/3) % 1 === 0 || (i/5) % 1 === 0) {
            sumMultiples += i
        }
    }

    return sumMultiples

}
