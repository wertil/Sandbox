// Leetcode #15
/*
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: [].*/


export const threeSum = (nums = [-1,0,1,2,2,2,-1,-4]) => {
    nums = nums.sort((a,b) => a - b)
    const output = []
    for (let i = 0; i < nums.length - 2; i++) {
        const curr = i
        let low = i + 1
        let hi = nums.length-1
        if( i > 0 && nums[i] === nums[i-1]) continue

          while (low < hi) {
            let total = nums[curr] + nums[low] + nums[hi]
            console.log(total);
            if(total === 0) {
                output.push([nums[curr],nums[low],nums[hi]])
                low++
                hi--
            }
            else if(total < 0) {
                low++
            }
            else {
                hi--
            }
        }
    }

    return output


}