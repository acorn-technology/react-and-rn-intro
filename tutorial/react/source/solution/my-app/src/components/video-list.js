import React from 'react';
import VideoListItem from './video-list-item';
import {connect} from "react-redux";

const VideoList = (props) => {

    const videoItems = props.videos.map(video => {
        return (
            <VideoListItem
                key={video.etag}
                video={video}/>
        );
    });

    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );

};

const mapStateToProps = state => {
    return {videos: state.videos};
};

export default connect(mapStateToProps, null)(VideoList);
