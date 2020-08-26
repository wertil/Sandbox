// create left and right poiners
// (represented by indices)
// while pointers haven't met
// - check if chars are the same
// - move pointers towards center

export const validPalendrom = (string) => {
    // sanitize string (remvoves white spaces, dots, etc.)
    string = string.replace(/[^\w]/gi, '').toLocaleLowerCase()
    let left = 0
    let right = string.length - 1
    while (left < right) {
        if(string[left] !== string[right]) {
            return false
        }
        left++
        right--
    }

    return true

}
