import React, {Component} from 'react';
import YTSearch from "youtube-api-search";
import _ from "lodash";
import {connect} from "react-redux";
import {selectVideo, youtubeResponse, youtubeSearch} from "../actions";

const API_KEY = "AIzaSyCY4kj7ZQBE9-0fX5KXrhq_BAOTqTZbNRU";

class SearchBar extends Component {

    videoSearch(searchTerm) {
        this.props.youtubeSearch(searchTerm);

        YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
            this.props.youtubeResponse(videos);
            this.props.selectVideo(videos[0]);
        });
    }

    render() {
        const videoSearch = _.debounce((searchTerm) => {this.videoSearch(searchTerm)}, 300);

        return (
            <div className="search-bar">
                <input
                    onChange={event => videoSearch(event.target.value)}/>
            </div>
        );
    }
}

export default connect(null, { youtubeSearch: youtubeSearch, youtubeResponse: youtubeResponse, selectVideo: selectVideo })(SearchBar);