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
  View,
  ActivityIndicator
} from 'react-native';
import AppContainer from './iosApp/views/AppContainer'
import Login from './iosApp/views/LoginView'
import AuthService from './iosApp/services/AuthService'

export default class GitHubBrowser extends Component {
  state = {
    isLoggedIn: false,
    checkingAuth: true
  }

  componentDidMount () {
    const authService = new AuthService

    authService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !== undefined
      })
    })
  }

  onLogin = () => {
    this.setState({isLoggedIn: true})
  }

  render () {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
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
})

AppRegistry.registerComponent('GitHubBrowser', () => GitHubBrowser);
