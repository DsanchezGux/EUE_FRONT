import Types from './types';

// TODO: Modify the type for the initial state
const initialState: any = null;

// TODO: Modify the action to match what is coming back from ./actions.ts
const reducer = (state = initialState, action: any): any => {
    const { type } = action;
    const newState: any = state;
    switch (type) {
        case Types.LOGIN:
            break;

        case Types.REGISTER:
            break;

        default:
            break;
    }
    return newState;
};

export { reducer };

export default reducer;
