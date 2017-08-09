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

export const clamp = number => (min, max) =>
  Math.min(Math.max(number, min), max)
