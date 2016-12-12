/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './iosViews/LoginView'

export default class GitHubBrowser extends Component {
  state = {
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({isLoggedIn: true})
  }

  render () {
    console.log(this.state)
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Logged In</Text>
        </View>
      )
    } else {
      return (
        <Login onLogin={this.onLogin} />
      )
    }
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

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
