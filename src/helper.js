/**
   Direction vector for 2 dimensional space
   @typedef {Object} Direction -
   @property {number} x - Horizontal direction
   @property {number} y - Vertical direction
 */

/**
   @typedef {Object} Keys - Has boolean properties indicating keypress status
   @property {boolean} left - KEY.LEFT
   @property {boolean} right - KEY.RIGHT
   @property {boolean} up - KEY.UP
   @property {boolean} down - KEY.DOWN
*/


/**
   Returns the angle associated to the direction vector. So if an arrow points
   to the left, that is considered 0 degrees.
   @param {Direction} direction -
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

/** @param {Keys} keys */
export function keysToDirection(keys) {
  const direction = {x: 0, y: 0}
  if (keys.left) direction.x = -1
  if (keys.right) direction.x = 1
  if (keys.up) direction.y = -1
  if (keys.down) direction.y = 1
  return direction
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

/**
   @param {Object} obj
   @return {Object}
*/
export const clone = obj => {
  let newObj = {}
  for (let attr in obj)
    newObj[attr] = obj[attr]
  return newObj
}

