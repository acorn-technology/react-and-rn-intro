/** @flow */
import React, {Component} from 'react';
import { Text, View, Button, ListView, Image, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import { Header, Card } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import YTSearch from 'youtube-api-search';
import YouTube from 'react-native-youtube';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

// Stylesheet, like CSS
const styles = StyleSheet.create({
  container: {flex:1, alignItems: 'stretch'},
  listview: {flex:1, marginTop:20},
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' },
  youtube: { alignSelf: 'stretch', height: 300 }
});

// Flow type declarations
type Video = {etag: string, kind:string, id:Object, snippet:Object };
type Props = {};
type State = {
  ds:any,
  videos: Array<Video>,
  loading:boolean,
  playingVideo:?Video,
  lastSearchTerm:string
};
// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State;

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {videos:[], ds:this.ds.cloneWithRows([]), loading:false, lastSearchTerm:"", playingVideo:null };
  }
  onPressSearch(searchTerm:string) {
    this.setState({loading: true, lastSearchTerm:searchTerm});
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      let ds = this.ds.cloneWithRows(videos)
      this.setState({loading: false, videos: videos, ds:ds, playingVideo:null});
    })
  }
  renderCardForVideo(video:Video){
    return (
      <TouchableOpacity style={{
        flex:1, alignSelf:'stretch'}}
        onPress={()=>{this.setState({playingVideo:video})
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
  renderRow(video:Video, unused:string, index:string){
    if ((null === this.state.playingVideo) || (video.etag !== this.state.playingVideo?.etag)){
      return this.renderCardForVideo(video);
    }
    else {
      return (
        <YouTube
          apiKey={API_KEY}
          videoId={video.id.videoId}   // The YouTube video ID
          play={true} controls={1}
          style={styles.youtube}
        />
    );
    }
  }

  render() {
    const {loading, videos, lastSearchTerm} = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: 'white'}}}
          outerContainerStyles={{backgroundColor: 'red'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={(searchTerm:string)=>{this.onPressSearch(searchTerm);}}
        />
        <ListView style={styles.listview}
          enableEmptySections={true}
          dataSource={this.state.ds}
          refreshControl={ <RefreshControl refreshing={loading}
                           onRefresh={()=>{this.onPressSearch(lastSearchTerm)}} >
                           </RefreshControl> }
          renderRow={(rowData, unused, index) => {
                     return this.renderRow(rowData, unused, index);
          }}
        ></ListView>
      </View>
    );
  }
}
