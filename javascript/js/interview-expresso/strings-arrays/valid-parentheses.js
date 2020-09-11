/*
    for char in str
    - if opening, push in to tack
    - if closing, op & compare
        - if test fails return false
    -if all passed return true

    example: "({}[])"

 */

export const validParentheses = string => {

    const pairs = {
        "{" : "}",
        "(" : ")",
        "[" : "]"
    }

    const stack = []

    for (let char of string) {
        // checks if char is in the keys of the pairs object:
        if( char in pairs ) {
            stack.push(char)
        } else {
            if(stack.length === 0 ) return false
            if(char !== pairs[stack.pop()])  return false
        }

    }

    // before simplifying:
    // if (stack.length) return false
    // else return true

    return !stack.length;

}