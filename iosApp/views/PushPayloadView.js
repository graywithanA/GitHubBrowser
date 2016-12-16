'use strict'

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  Image
} from 'react-native'
import AuthService from '../services/AuthService'
import moment from 'moment'

class PushPayload extends React.Component {
  state = {

  }

  componentWillMount () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.setState({
      dataSource: ds
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>this is a test</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 15,
    alignItems: 'center'
  }
})

export default PushPayload
