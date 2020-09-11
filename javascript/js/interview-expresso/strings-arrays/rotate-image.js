/*
Rotate Image
Leetcode #48
https://leetcode.com/problems/rotate-image/
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

    [
    [5,1,9,11],
    [2,4,8,10],
    [13,3,6,7],
    [15,14,12,16]
    ]


reverse outer arrays
for each row
- for each column
    - flip coordinates

    example: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]

*/

export const rotateImage = matrix => {
    matrix.reverse()

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < i; j++) {
            let temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
        }
    }

    return matrix
}