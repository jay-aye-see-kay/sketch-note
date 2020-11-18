import * as Random from "expo-random";

export type Sketch = {
  id: string;
  svg: string;
  createdAt: string;
  title: string;
};

export type Action =
  | { type: "saveSketch"; payload: { svg: string } }
  | { type: "startSketch" }
  | { type: "endSketch" };

type State = {
  isDrawing: boolean;
  sketches: Sketch[];
};

export const initialState: State = { isDrawing: false, sketches: [] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "startSketch":
      return { ...state, isDrawing: true };
    case "endSketch":
      return { ...state, isDrawing: false };
    case "saveSketch":
      return {
        ...state,
        sketches: [
          ...state.sketches,
          {
            id: genUuid(),
            svg: action.payload.svg,
            createdAt: new Date().toISOString(),
            title: "my sketch",
          },
        ],
      };
    default:
      assertNever(action);
      throw new Error("unknown action type");
  }
};

// FIXME while this _should_ have 128 bits of randomness like a UUID it creates a
// much longer string than needed
const genUuid = () => Random.getRandomBytes(16).join("");

const assertNever = (x: never): never => {
  throw new Error("Unexpected value. Should have been never.");
};
