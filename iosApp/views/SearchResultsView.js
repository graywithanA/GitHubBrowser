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

class SearchResults extends React.Component {

  componentWillMount () {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.setState({
      dataSource: ds,
      showProgress: true,
      searchQuery: this.props.searchQuery
    })
  }

  componentDidMount () {
    this.doSearch()
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight
        underlayColor='#ddd'>
          <View style={styles.row}>

          </View>
      </TouchableHighlight>
    )
  }

  doSearch = () => {
    var url = `https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.searchQuery)}`
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          repositories: responseData.repositories,
          dataSource: this.state.dataSource.cloneWithRows(responseData.items)
        })
      })
      .finally(() => {
        this.setState({
          showProgress: false
        })
      })
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
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
    justifyContent: 'flex-start',
    // marginTop: 64
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
    borderBottomWidth: 1,
    backgroundColor: '#fff'
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

export default SearchResults
