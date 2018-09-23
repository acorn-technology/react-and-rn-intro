import _ from 'lodash';
import React, {Component} from 'react';
import SearchBar from './components/search-bar';
import YTSearch from 'youtube-api-search';
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";

const API_KEY = "AIzaSyDJGHMdImJ4b6_lLCyYupdmVSpawyyk3Ns";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        // this.videoSearch('acorntechnology');
    }

    videoSearch(searchTerm) {
        YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((searchTerm) => {this.videoSearch(searchTerm)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

export default App;
