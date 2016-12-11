'use strict'

import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native'

class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}> GitHub Browser</Text>
        <TextInput style={styles.input} placeholder="GitHub Username"></TextInput>
        <TextInput style={styles.input} placeholder="GitHub Password" secureTextEntry="true"></TextInput>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
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
  }
})

export default Login
