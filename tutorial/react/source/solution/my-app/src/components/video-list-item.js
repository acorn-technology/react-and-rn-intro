import React from 'react';
import {connect} from "react-redux";
import {selectVideo} from "../actions";

const VideoListItem = (props) => {

    const video = props.video;
    const onVideoSelect = video => props.selectVideo(video);
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" alt="" src={imageUrl} />
                </div>
                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};

// const VideoListItem = ({video, onVideoSelect}) => {
//     const imageUrl = video.snippet.thumbnails.default.url;
//     return ...;
// };

export default connect(null, {selectVideo})(VideoListItem);