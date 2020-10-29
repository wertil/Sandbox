/*
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]
https://interviewespresso.teachable.com/courses/864177/lectures/15686283
https://leetcode.com/problems/binary-tree-level-order-traversal/
* */

// BFS Breadfirst Search
/*
while the que is not empty
-set bookmark
- while bookmark > 0
    - pull node from queue
    - save "value" into level array
    - children to queue
 */

// Definition for a binary tree node
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null
}


export const levelOrder = function (root) {

root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);


    if(!root) return [];
    const queue = [root];
    const levels = [];
    while (queue.length) {
        console.log(queue, queue.length);
        let size = queue.length;
        const currentLevel = [];
        while (size--) {
            const item = queue.shift();
            currentLevel.push(item.val);
            if(item.left) queue.push(item.left);
            if(item.right) queue.push(item.right);
        }
        levels.push(currentLevel);
    }
    return levels;
}