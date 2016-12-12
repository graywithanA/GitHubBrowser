'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator } from 'react-native'
import AuthService from '../iosServices/AuthService'

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {
    username: null,
    password: null,
    showProgress: false
  }

  onLoginPressed = () => {
    const { username, password } = this.state
    const authService = new AuthService()

    this.setState({showProgress: true})
    console.log(`Attempting to login user: ${username}`)

    authService.login({
      username: username,
      password: password
    }, (results) => {
      this.setState({
        ...results,
        showProgress: false
      })

      if (results.success && this.props.onLogin) {
        this.props.onLogin()
      }
    })
  }

  render() {
    const { success, incorrectCredentials, unknownError, showProgress} = this.state
    let errorCtrl = <View />

    if (!success && incorrectCredentials) {
      errorCtrl = <Text style={styles.error}>That username and password didn't work.</Text>
    }

    if (!success && unknownError) {
      errorCtrl = <Text style={styles.error}>Something went wrong, please try again.</Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}> GitHub Browser</Text>
        <TextInput
          style={styles.input}
          placeholder="GitHub Username"
          autoCapitalize="none"
          onChangeText={(text) => this.setState({username: text})}>
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder="GitHub Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}>
        </TextInput>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginPressed}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={showProgress}
          size="large"
          style={styles.loader} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10

  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 20
  }
})

export default Login
