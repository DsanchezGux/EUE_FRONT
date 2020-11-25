import { login, register } from './actions';

import { Dispatch } from 'redux';

export const operation = (): any => {
    return (dispatch: Dispatch<any>): any => {
        dispatch(login());
    };
};

export type Operations = {
    operation: () => void;
};

export const operations: Operations = {
    operation,
};
