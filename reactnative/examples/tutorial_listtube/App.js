/** @flow */
import React, {Component} from 'react';
import {Text, View, Button, ListView, Image, TouchableOpacity, Alert} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from './components/SearchBar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

// Flow type declarations
type Video = {video: Object};
type Props = {};
type State = { videos: Array<Video>, ds:any, loading:boolean};

// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State = { videos:[], ds:[], loading:false };

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { videos:[], ds:this.ds.cloneWithRows([]), loading:false };
  }

  onPressSearch(searchTerm:string) {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      let ds = this.ds.cloneWithRows(videos)
      this.setState({loading: false, videos: videos, ds:ds});
    })
  }

  renderRow(rowData:Video, unused:string, index:string){
    return (
      <TouchableOpacity style={{backgroundColor:'#E0FFFF', margin:1,
        flexDirection:'row', alignItems:'center'}}
        onPress={()=>{
        }}
        >
        <Text style={{flex:1, marginLeft:10}}>Video {index}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    const {loading, videos} = this.state;
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
            return this.renderRow(rowData, unused, index);}} />
      </View>
    );
  }
}
