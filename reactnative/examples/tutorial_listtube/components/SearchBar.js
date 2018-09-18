import React from 'react';
import { Platform, StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

export class SearchBar extends React.Component {
  state = { searchTerm: '' };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={searchTerm => this.setState({searchTerm})}
          value={this.state.searchTerm}
        />
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonTextStyle}
          title={this.props.loading ? "Loading..." : "Search"}
          onPress={() => this.props.onPressSearch(this.state.searchTerm)}
        />
      </View>
    );
  }
}

// Add an underline on iOS.
const textInputIos = Platform.OS === 'ios' ? {
  borderColor: 'gray',
  borderBottomWidth: 1
} : {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    ...textInputIos,
    flex: 1,
    marginLeft: 10
  },
  button: {
    height: 30,
    marginBottom: 8
  },
  buttonTextStyle: {
    color:'white',
    height: 24,
    fontSize: 18,
    alignSelf: 'center'
  }
});
