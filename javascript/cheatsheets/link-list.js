class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const node = new ListNode(1);
console.log(node);
node.next = new ListNode(2);
const head = new ListNode(0);
head.next = node;

let on = head;
while(on !== null) {
    console.log(on.value);
    on = on.next;
}