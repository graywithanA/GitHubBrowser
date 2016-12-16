'use strict'

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native'
import AuthService from '../services/AuthService'
import moment from 'moment'

class Feed extends React.Component {
  state = {

  }

  componentWillMount () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.setState({
      dataSource: ds,
      showProgress: true
    })
  }

  componentDidMount () {
    this.fetchFeed()
  }

  pressRow = () => {
    console.log('pressed')
  }

  renderRow = (rowData) => {
    // let ref = <Text></Text>
    //
    // if (rowData.payload.ref) {
    //   ref = <Text style={styles.label}>{rowData.payload.ref.replace('refs/heads/', '')}</Text>
    // }

    return (
      <TouchableHighlight
        onPress={() => {this.pressRow(rowData)}}
        underlayColor='#ddd'>
          <View style={styles.row}>
            <Image
              source={{uri: rowData.actor.avatar_url}}
              style={styles.avatar} />
            <View style={styles.labelContainer}>
              <Text style={styles.label}><Text style={{fontWeight: '600'}}>{rowData.actor.login}</Text> pushed to</Text>
              {/* {ref} */}
              <Text style={styles.label}>{rowData.payload.ref.replace('refs/heads/', '')}</Text>
              <Text style={styles.label}>at <Text style={{fontWeight: '600'}}>{rowData.repo.name}</Text></Text>
              <Text style={styles.label}>{moment(rowData.created_at).fromNow()}</Text>
            </View>
          </View>
      </TouchableHighlight>
    )
  }

  fetchFeed = () => {
    const authService = new AuthService()

    authService.getAuthInfo((err, authInfo) => {
      const url = `https://api.github.com/users/${authInfo.user.login}/received_events`

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        let feedItems = responseData.filter((ev) => ev.type === 'PushEvent')
        // let feedItems = responseData
        console.log('almost set state');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        })
      })
      .catch((err) => {
        console.log('error: ', err);
      })
    })
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            animating={true} />
        </View>
      )
    }

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
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  labelContainer: {
    paddingLeft: 20
  },
  label: {
    backgroundColor: '#fff'
  }
})

export default Feed
