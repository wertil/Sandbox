// loop through the string input list
// -> sort each string
// -> sorted in table? add to array
// -> create array
export const groupAnagram = array => {
    const anagramHash = {}
    for (let word of array) {
        const sortedWord = word.split('').sort().join('')
        if(anagramHash[sortedWord]) anagramHash[sortedWord].push(word)
        else anagramHash[sortedWord] = [word]
    }
    return Object.values(anagramHash);
}