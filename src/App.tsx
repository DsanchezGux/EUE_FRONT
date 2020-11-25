import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './redux/store';

import { AppRouter } from './routes/AppRouter';

const reduxStore = configureStore();

export const App = () => {
    return (
        <Provider store={reduxStore}>
            <AppRouter />
        </Provider>
    );
};
