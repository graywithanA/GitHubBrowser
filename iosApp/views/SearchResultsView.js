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
    console.log(rowData);
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{rowData.full_name}</Text>
        <View style={styles.repoContainer}>
          <View style={styles.repoCell}>
            <Image source={require('image!star')} style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
          </View>
          <View style={styles.repoCell}>
            <Image source={require('image!fork')} style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
          </View>
          <View style={styles.repoCell}>
            <Image source={require('image!issues2')} style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
          </View>
        </View>
      </View>
    )
  }

  doSearch = () => {
    var url = `https://api.github.com/search/repositories?q=${encodeURIComponent(this.state.searchQuery)}`
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
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
    borderColor: '#d7d7d7',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    height: 80
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  repoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
  // avatar: {
  //   height: 36,
  //   width: 36,
  //   borderRadius: 18
  // },
  // labelContainer: {
  //   paddingLeft: 20
  // },
  // label: {
  //   backgroundColor: '#fff'
  // }
})

export default SearchResults
