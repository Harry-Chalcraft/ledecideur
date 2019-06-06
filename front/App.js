import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Font } from 'expo';

import Navigation from "./Components/Navigation"

import result from './Reducers/randomize.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({result}));

export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      fontLoaded: false,
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
      'comfortaa': require('./assets/fonts/Comfortaa.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      this.state.fontLoaded ? (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
