export const firstUniqueCharacter = (string) => {

    for (let i = 0; i < string.length; i++) {
        const char = string[i]
        if (string.indexOf(char) === string.lastIndexOf(char)) {
            return i
        }

    }

    return -1

}

// Hash Table Solution (not as efficient):
export const firstUniqueCharacter2 = (string) => {

    const table = {}

    // fill hashtable
    for (const char of string) {
        if (table[char]) table[char]++
        else table[char] = 1
    }

    // check for each letter in string if only 1 appearance exists
    for (let i = 0; i < string.length; i++)  {
        if (table[string[i]] === 1) return i
    }

    return table

}