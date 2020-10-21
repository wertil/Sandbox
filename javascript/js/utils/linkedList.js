export function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

export function arrayToLinkedList(array) {
    array.reverse();
    let linkedList = null
    for(let i = 0; i < array.length; i++) {
        linkedList = new ListNode(array[i], linkedList)
    }
    return linkedList
}

export function log(value) {
    console.log(value
    )
}

