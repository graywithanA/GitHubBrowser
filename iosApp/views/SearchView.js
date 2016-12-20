'use strict'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight } from 'react-native'

import SearchResults from './SearchResultsView'

class Search extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {}

  onSearchPressed = () => {
    const { searchQuery } = this.state
    console.log(`Attempting to search for: ${searchQuery}`)

    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          autoCapitalize="none"
          onChangeText={(text) => this.setState({searchQuery: text})}>
        </TextInput>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSearchPressed}>
            <Text style={styles.buttonText}>Search</Text>
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

export default Search
