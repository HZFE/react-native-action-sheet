/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import actionSheet from './src'

const BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel'
]
const DESTRUCTIVE_INDEX = 3
const CANCEL_INDEX = 4

export default class App extends Component<{}> {
  _openActionSheet = () => {
    actionSheet.showActionSheetWithOptions({
      position: 'top',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      native: true
    }, () => {

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openActionSheet}>
          <Text style={styles.welcome}>
            Open action-sheet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
