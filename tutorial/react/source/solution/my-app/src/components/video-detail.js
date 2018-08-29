import React from 'react';

const VideoDetail = ({video}) => {

    if (!video) {
        return <div>Loading...</div>
    }

    const videoUrl = "https://www.youtube.com/embed/" + video.id.videoId;

    //ES6 template strings doing the same thing
   // const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" title="video-detail" src={videoUrl}/>
            </div>
            <div className="details">
                <div className="video-title">{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;