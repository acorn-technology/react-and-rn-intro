/** @flow */
import React, {Component} from 'react';
import {Platform, Text, View, Button, ListView, Image, TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import { Header, Card } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import YTSearch from 'youtube-api-search';
import YouTube from 'react-native-youtube';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

const styles = StyleSheet.create({
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' }
});

// Flow type declarations
type Video = {etag: string, kind:string, id:Object, snippet:Object };
type Props = {};
type State = {
  playingVideo:?Object,
  videos: Array<Video>,
  ds:any,
  loading:boolean,
  lastSearchTerm:string};
// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State;// = { playingVideo:-1, videos:[], ds:[], loading:false, lastSearchTerm:"" };

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {playingVideo:null, videos:[], ds:this.ds.cloneWithRows([]), loading:false, lastSearchTerm:"" };
  }

  onPressSearch(searchTerm:string) {
    this.setState({loading: true, lastSearchTerm:searchTerm});
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      let ds = this.ds.cloneWithRows(videos)
      this.setState({loading: false, videos: videos, ds:ds, playingVideo:null});
    })
  }

  renderRow(video:Video, unused:string, index:string){
    if ((null === this.state.playingVideo) || (video.etag !== this.state.playingVideo?.etag)){
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
    else {
      return (
        <YouTube
          apiKey={API_KEY}
          videoId={video.id.videoId}   // The YouTube video ID
          play={this.state.playingVideo !== null}
          play={true}
          loop={false}
          controls={1}
          onError={e => console.log('error:' + e.error)}
          onReady={e => console.log('ready')}
          onChangeState={e => console.log('state:' + e.state)}
          onChangeQuality={e => console.log('quality:' + e.quality)}
          onChangeFullscreen={e => console.log('fullscreen:' + e.isFullscreen)}
          onProgress={
            Platform.OS === 'ios'
              ? e => {}
              : undefined
          }             // control playback of video with true/false
          style={{ alignSelf: 'stretch', height: 300 }}
        />
    );
    }
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
