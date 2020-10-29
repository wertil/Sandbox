/*
Given the head of a linked list, remove the nth node from the end of the list and return its head.
https://leetcode.com/problems/linked-list-cycle/
https://interviewespresso.teachable.com/courses/864177/lectures/15686281

Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.
Follow up:
Can you solve it using O(1) (i.e. constant) memory?

 */

import {arrayToLinkedList} from "../../utils/linkedList.js";

// Using Floy Algorithm (Tortoise and Hare)
export const linkedListCycleFloyd = (head = [1,3,5,6,3,5,6,3,5,6]) => {

    head = arrayToLinkedList(head)

    // while we haven't hit the tail
    // - advance "fast" by 2 node
    // - advance "slow" by 1 node
    // if fast == slow, we have a cycle

    let slow = head;
    let fast = head;

    while( fast && fast.next ) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast) return true;
    }
    return false;

}

export const linkedListCycle = (head = [1,3,5,6,3,5,6,3,5,6]) => {

    head = arrayToLinkedList(head)

    // while we haven't hit the tail
    // - is node set? if so, it's a cycle
    // - otherwise add node to set
    // out of list? return false

    const nodes = new Set();
    let on = head;

    while(on) {
        if(nodes.has(on)) return true;
        nodes.add(on)
        on = on.next;
    }

    return false;


}
