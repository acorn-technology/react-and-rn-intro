import React from 'react';
import {ScrollView, View} from 'react-native';
import VideoListItem from './VideoListItem'

const VideoList = ({videos}) => {
  const videoItems = videos.map( video => (
    <VideoListItem
      key={video.etag}
      video={video}
    />
  ));

  return (
    <ScrollView>
      <View style={{marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        {videoItems}
      </View>
    </ScrollView>
  );
};

export default VideoList;
