import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import { connect } from 'react-redux';

import { searchYoutube, youtubeResponse, selectVideo } from './../actions';

const API_KEY = "AIzaSyDJGHMdImJ4b6_lLCyYupdmVSpawyyk3Ns";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.videoSearch('acorntechnology');
    }

    videoSearch(searchTerm) {
        this.props.searchYoutube(searchTerm);

        YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
            this.props.youtubeResponse(videos);
            this.props.selectVideo(videos[0]);
        });
    }

    render() {
        const debouncedVideoSearch = _.debounce((searchTerm) => {this.videoSearch(searchTerm)}, 300);

        return (
            <div className="search-bar">
                <input onChange={event => debouncedVideoSearch(event.target.value)}/>
            </div>
        );
    }
}

export default connect(
    null,
    { searchYoutube, youtubeResponse, selectVideo }
)(SearchBar);