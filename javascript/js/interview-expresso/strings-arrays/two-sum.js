// Leetcode #1
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
//
//     You may assume that each input would have exactly one solution, and you may not use the same element twice.
//
//     You can return the answer in any order.

// Solution with O(n²) - not efficient
export const twoSum2 = (nums = [2, 7, 11, 15], target = 26) => {
    for (let i = 0; i < nums.length; i++) {
        const want = target - nums[i]
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] === want) return [i, j]
        }
    }
}

export const twoSum = (nums = [2, 7, 11, 15], target = 17) => {
    let hash = {}
    for (let i = 0; i < nums.length; i++) {
        const want = target - nums[i]
        if(want in hash) return [hash[want], i]
        hash[nums[i]] = i;
    }


}