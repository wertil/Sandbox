/*
Given the head of a linked list, remove the nth node from the end of the list and return its head.
https://leetcode.com/problems/reverse-linked-list/
https://interviewespresso.teachable.com/courses/864177/lectures/15686280

Reverse a singly linked list.
Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

 */

import {arrayToLinkedList} from "../../utils/linkedList.js";

export const reverseLinkedList = (head = [1, 2, 3, 4, 5]) => {

    head = arrayToLinkedList(head)

    // ITERATIVE SOLUTION
    // - save .next in temp variable
    // - set .next to prev
    // set prev to current node
    // advance current node
    let prev = null;
    let on = head;
    while (on) {
        let temp = on.next;
        on.next = prev;
        prev = on;
        on = temp;
    }
    return prev;

}

// RECURSIVE SOLUTION
export const reverseLinkedListRecursive = (head = [1, 2, 3, 4, 5]) => {

    head = arrayToLinkedList(head)

    const reverseListR = function (on, prev = null) {
        if (on === null) return prev;
        let temp = on.next;
        on.next = prev;
        return reverseListR(temp, on)
    }

    return reverseListR(head);

}