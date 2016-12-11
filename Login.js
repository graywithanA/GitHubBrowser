'use strict'

import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}> GitHub Browser</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center'

  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  }
})

export default Login
