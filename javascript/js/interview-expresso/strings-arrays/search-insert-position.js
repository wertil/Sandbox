/*
Leetcode 35

Search Insert Position
Given a sorted array and a target value, return the index if the target is found.
    If not, return the index where it would be if it were inserted in order.
    You may assume no duplicates in the array

    init lo & hi pointers
    while lo <= hi
    - calculate mid pointer
    - compare mid value to target
    - if target greater, lo = mid + 1
    - if target less, hi = mid - 1

    example: [2,4,8,17,20,23,50]

*/

export const searchInsertPosition = (nums, target) => {
    let lowPointer = 0
    let highPointer = nums.length - 1

    while(lowPointer <= highPointer) {
        let midPointer = Math.floor((highPointer + lowPointer) / 2)
        let midValue = nums[midPointer];

        if( midValue === target ) return midPointer
        else if( midValue < target) {
            lowPointer = midPointer + 1
        }
        else {
            highPointer = midPointer - 1
        }

    }

    return lowPointer

}