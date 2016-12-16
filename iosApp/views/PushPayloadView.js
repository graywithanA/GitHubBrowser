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
      dataSource: ds.cloneWithRows(this.props.pushEvent.payload.commits),
      pushEvent: this.props.pushEvent
    })
  }

  renderRow = (rowData) => {
    return (
      <View style={styles.row}>
        <Text><Text style={styles.bold}>{rowData.sha.substring(0, 6)}</Text> - {rowData.message}}</Text>
      </View>
    )
  }

  render() {
    const { pushEvent, dataSource } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={{uri: pushEvent.actor.avatar_url}}
          style={styles.avatar} />
          <Text style={styles.time}>
            {moment(pushEvent.created_at).fromNow()}
          </Text>
          <Text><Text style={styles.bold}>{pushEvent.actor.login}</Text> pushed to</Text>
          <Text style={styles.bold}>{pushEvent.payload.ref.replace('refs/heads/', '')}</Text>
          <Text>at <Text style={styles.bold}>{pushEvent.repo.name}</Text></Text>

          <Text style={styles.commits}>{pushEvent.payload.commits.length} Commits</Text>

          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}/>
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
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  time: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    padding: 10
  },
  commits: {
    paddingTop: 40,
    fontSize: 20
  },
  bold: {
    fontWeight: '800',
    fontSize: 16
  }
})

export default PushPayload
