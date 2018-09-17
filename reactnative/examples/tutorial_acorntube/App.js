import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import VideoList from './VideoList'
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

export default class App extends React.Component {
  state = {
    loading: false,
    videos: []
  }

  onPressSearch = searchTerm => {
    this.searchYouTube(searchTerm)
  }

  searchYouTube = searchTerm => {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term: searchTerm}, videos => {
      this.setState({loading: false, videos: videos});
    })
  }
  render() {
    const {loading, videos} = this.state;
    return (
      <View style={{flex:1}}>
        <Header
          centerComponent={{text: 'YouTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={this.onPressSearch}
        />
        <VideoList videos={videos}/>
      </View>
    );
  }
}
