import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './redux/store';

import AppNavigator from './routes';

console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </Provider>
        );
    }
}
