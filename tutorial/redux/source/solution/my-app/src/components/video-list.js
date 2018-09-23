import React from 'react';
import { connect } from 'react-redux';

import VideoListItem from './video-list-item';

const VideoList = (props) => {

    const videoItems = props.videos.map(video => {
        return (
            <VideoListItem
                key={video.etag}
                video={video}/>
        );
    });
console.log('RE-RENDER VIDEO KISUT');
    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

const mapStateToProps = state => {
    console.log('VideoList mapStateToProps', state);
    return { videos: state.videos };
}

export default connect(
    mapStateToProps,
)(VideoList);