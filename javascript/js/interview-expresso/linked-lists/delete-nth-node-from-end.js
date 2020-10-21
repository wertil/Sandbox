/*
Given the head of a linked list, remove the nth node from the end of the list and return its head.
https://leetcode.com/problems/remove-nth-node-from-end-of-list/
https://interviewespresso.teachable.com/courses/864177/lectures/15686278

- traverse through list, following ".next"
-> count each node to get length
get LEFT index (length - n - 1)
traverse, point around

 */

import {arrayToLinkedList} from "../../utils/linkedList.js";

export const removeNthFromEnd = (head = [1, 2, 3, 4, 5], n = 5) => {

    head = arrayToLinkedList(head)

    // 1. measure length
    let on = head;
    let length = 1;
    while (on) {
        length++;
        on = on.next;
    }
    // get LEFT index:
    let leftIndex = length - n - 1;

    // 3. handle head deleted
    if (leftIndex === 0) {
        return head.next;
    }

    // 2. point around to delete node
    on = head;
    while (leftIndex-- > 1) {
        on = on.next;
    }
    on.next = on.next.next;
    return head;


}