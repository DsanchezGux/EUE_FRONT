import Types from "./types";

// Modify the return types for each action
const login = (): any => {
  return {
    type: Types.LOGIN
  };
}

const register = (): any => {
  return {
    type: Types.REGISTER
  };
}

export {
  login,
  register
};
