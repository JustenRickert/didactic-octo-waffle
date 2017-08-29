import character from "./character"

describe("character reducer", () => {
  it("should handle initial state", () => {
    expect(character(undefined, {})).toEqual({
      position: {x: 15, y: 15},
      speed: 5
    })
  })

  it("should handle EDIT_CHARACTER_POSITION", () => {
    expect(
      character(undefined, {
        type: "EDIT_CHARACTER_POSITION",
        position: {x: 50, y: 50}
      })
    ).toEqual({position: {x: 50, y: 50}, speed: 5})
  })

  it("should handle EDIT_CHARACTER_SPEED", () => {
    expect(
      character(undefined, {
        type: "EDIT_CHARACTER_SPEED",
        speed: 10
      })
    ).toEqual({position: {x: 15, y: 15}, speed: 10})
  })
})
