import _ from 'lodash';
import React, {Component} from 'react';
import SearchBar from './components/search-bar';
import YTSearch from 'youtube-api-search';
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";
import { API_KEY } from "./api-key.json";
import * as actions from './actions.js';

class App extends Component {
    store = {};

    constructor(props) {
        super(props);

        this.store = this.createStore();

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('acorntechnology');
    }

    createStore() {
        let state = {};

        function dispatch(action) {
            console.log('Dispatching action', action);
        }

        return { dispatch };
    }

    videoSearch(searchTerm) {
        this.store.dispatch({
            type: actions.SEARCH_YOUTUBE,
            searchTerm
        });

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
