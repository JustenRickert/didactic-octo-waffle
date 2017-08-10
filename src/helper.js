/**
   Direction vector for 2 dimensional space
   @typedef {Object} Direction
   @property {number} x - Horizontal direction
   @property {number} y - Vertical direction
 */

/**
   Returns the angle associated to the direction vector. So if an arrow points
   to the left, that is considered 0 degrees.
   @param {Direction} direction
   @return {number} angle
 */
export function directionMatrixToAngle(direction) {
  const directions = [
    {x: 0, y: -1},
    {x: 1, y: -1},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 0, y: 1},
    {x: -1, y: 1},
    {x: -1, y: 0},
    {x: -1, y: -1}
  ]
  let angle = 0
  for (let d of directions) {
    if (JSON.stringify(d) === JSON.stringify(direction)) return angle
    angle += 45
  }
}

/**
   Returns the number if between the min or the max, otherwise clamps the number
   to either min or max (whichever is closer).
   @param {number} number
 */
export const clamp = number => (
  /** @type {number} */ min,
  /** @type {number} */ max
) => Math.min(Math.max(number, min), max)
