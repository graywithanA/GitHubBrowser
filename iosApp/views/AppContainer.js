'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS
} from 'react-native'
import Feed from './FeedView'

class AppContainer extends React.Component {
  state = {
    selectedTab: 'feed'
  }

  render() {
    // translucent={false} on NavigatorIOS fixes the bug causing ListView content to be hidden behind the Navigator.
    // see: https://github.com/facebook/react-native/issues/2151
    // here's an alternative solution: https://github.com/facebook/react-native/issues/898
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'feed'}
          icon={require('image!inbox')}
          onPress={() => this.setState({selectedTab: 'feed'})}>
            <NavigatorIOS
              style={styles.nav}
              translucent={false}
              initialRoute={{
                component: Feed,
                title: 'Feed'
              }} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab === 'search'}
            icon={require('image!search')}
            onPress={() => this.setState({selectedTab: 'search'})}>
              <Text  style={styles.welcome}>Tab 2</Text>
          </TabBarIOS.Item>
      </TabBarIOS>
    )
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
    margin: 10
  },
  nav: {
    flex: 1
  }
})

export default AppContainer
