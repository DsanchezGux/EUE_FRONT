import { reducer } from "./reducers";
import Types from "./types";

describe("testing the auth reducer", () => {
  describe("testing specific action case", () => {
    const action: any = {
      type: Types.LOGIN
    };

    it("passes the test", () => {
      const currentState: any = {};
      const newState: any = reducer(currentState, action);
      expect(newState).toEqual(currentState);
    });
  });
});
