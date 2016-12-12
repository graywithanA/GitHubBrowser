'use strict'

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native'
import AuthService from '../services/AuthService'

class Feed extends React.Component {
  state = {

  }

  componentWillMount () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.setState({dataSource: ds.cloneWithRows(['A', 'B', 'C'])})
  }

  componentDidMount () {
    this.fetchFeed()
  }

  renderRow = (rowData) => {
    return <Text style={styles.row}>
      {rowData}
    </Text>
  }

  fetchFeed = () => {
    var authService = new AuthService()

    authService.getAuthInfo((err, authInfo) => {
      console.log(err, authInfo);
    })
    //
    // authService.getAuthInfo((err, authInfo) => {
    //   console.log(authInfo)
    //   const url = `https://api.github.com/users/${authInfo.user.login}/${received_events}`
    //
    //   fetch(url, {
    //     headers: authInfo.header
    //   })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     let feedItems = responseData.filter((ev) = ev.type === 'PushEvent')
    //     this.setState({dataSource: this.state.dataSource.cloneWithRows(feedItems)})
    //   })
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  row: {
    color: '#333'
  }
})

export default Feed
