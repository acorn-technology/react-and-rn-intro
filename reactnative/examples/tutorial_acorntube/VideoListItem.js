import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native'
import { Card } from 'react-native-elements'

const styles = StyleSheet.create({
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' }
});

const VideoListItem = ({video}) => {
  return(
    <View>
      <Card containerStyle={styles.card}>
        <Image
          style={styles.image}
          source={{uri: video.snippet.thumbnails.medium.url}}
        />
        <View style={styles.textBox}>
          <Text style={styles.title}>
            {video.snippet.title}
          </Text>
          <Text style={styles.channel}>
            {video.snippet.channelTitle}
          </Text>
          <Text style={styles.description}>
            {video.snippet.description}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default VideoListItem;
