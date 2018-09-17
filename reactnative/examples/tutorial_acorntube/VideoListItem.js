import React from 'react';
import { View, Text, Image} from 'react-native'
import { Card } from 'react-native-elements'

const VideoListItem = ({video}) => {
  const {card, image, textBox, title, channel, description} = styles;
  return(
    <View>
      <Card containerStyle={card}>
        <Image
          style={image}
          source={{uri: video.snippet.thumbnails.medium.url}}
        />
        <View style={textBox}>
          <Text style={title}>
            {video.snippet.title}
          </Text>
          <Text style={channel}>
            {video.snippet.channelTitle}
          </Text>
          <Text style={description}>
            {video.snippet.description}
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = {
  card: {
    padding: 5
  },
  image: {
    alignSelf: 'stretch',
    height: 180
  },
  textBox: {
    flex: 1,
    padding: 1
  },
  title: {
    fontSize: 12,
  },
  channel: {
    fontSize: 11,
    color: '#777',
    alignSelf: 'flex-end'
  },
  description: {
    fontSize: 10,
    alignSelf: 'center'
  }
};

export default VideoListItem;
