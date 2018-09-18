/** @flow */
import React, {Component} from 'react';
import {Text, View, Button, ListView, Image, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import { Header, Card } from 'react-native-elements';
import { SearchBar } from './components/SearchBar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

// Flow type declarations
type Video = {etag: string, id:Object, snippet:Object, kind:string};
type Props = {};
type State = { videos: Array<Video>, ds:any, loading:boolean, lastSearchTerm:string};

const styles = StyleSheet.create({
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' }
});

// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State = { videos:[], ds:[], loading:false, lastSearchTerm:"" };

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { videos:[], ds:this.ds.cloneWithRows([]), loading:false, lastSearchTerm:"" };
  }

  onPressSearch(searchTerm:string) {
    this.setState({loading: true, lastSearchTerm:searchTerm});
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      let ds = this.ds.cloneWithRows(videos)
      this.setState({loading: false, videos: videos, ds:ds});
    })
  }

  renderRow(video:Video, unused:string, index:string){
    return (
      <TouchableOpacity style={{
        flex:1, backgroundColor:'#E0FFFF', alignSelf:'stretch'}}
        onPress={()=>{
        }}>
        <Card containerStyle={styles.card}>
          <Image style={styles.image}
              source={{uri: video.snippet.thumbnails.medium.url}}
          />
          <View style={styles.textBox}>
            <Text style={styles.title}>
                        {video.snippet.title}
            </Text>
            <Text style={styles.channel}>
                        {video.snippet.channelTitle}
            </Text>
            <Text style={styles.description}>
                        {video.snippet.description}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    const {loading, videos, lastSearchTerm} = this.state;
    return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: '#fff'}}}
          outerContainerStyles={{backgroundColor: '#E62117'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={(searchTerm:string)=>{this.onPressSearch(searchTerm);}}
        />
        <ListView style={{flex:1, marginTop:20}} enableEmptySections={true} dataSource={this.state.ds}
          renderRow={(rowData, unused, index) => {
            return this.renderRow(rowData, unused, index);}}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={()=>{this.onPressSearch(lastSearchTerm)}}
              />
            }
          />
      </View>
    );
  }
}
