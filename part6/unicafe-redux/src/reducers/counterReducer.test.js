import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import counterReducer from "./counterReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("returns initial state", () => {
    const action = { type: "DO_NOTHING" };
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;
    const action = { type: "GOOD" };

    deepFreeze(state);
    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const state = initialState;
    const action = { type: "OK" };

    deepFreeze(state);
    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const state = initialState;
    const action = { type: "BAD" };

    deepFreeze(state);
    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("reset returns initial state", () => {
    const state = { good: 5, ok: 3, bad: 2 };
    const action = { type: "RESET" };

    deepFreeze(state);
    const newState = counterReducer(state, action);

    expect(newState).toEqual(initialState);
  });
});
