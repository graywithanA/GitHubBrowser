'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TabBarIOS } from 'react-native'

class AppContainer extends React.Component {
  state = {
    selectedTab: 'feed'
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'feed'}
          icon={require('image!inbox')}
          onPress={() => this.setState({selectedTab: 'feed'})}>
            <View style={styles.container}>
              <Text  style={styles.welcome}>Tab 1</Text>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab === 'search'}
            icon={require('image!search')}
            onPress={() => this.setState({selectedTab: 'search'})}>
              <View style={styles.container}>
                <Text  style={styles.welcome}>Tab 2</Text>
              </View>
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
    margin: 10,
  }
})

export default AppContainer
