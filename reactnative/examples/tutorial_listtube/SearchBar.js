/* @flow */
import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {loading:boolean, onPressSearch:Function};
type State = {searchTerm:string};

export class SearchBar extends Component<Props, State> {
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
          icon={{
            name: 'search',
            size: 18,
            color: 'white'
          }}
          textStyle={styles.buttonTextStyle}
          title={this.props.loading ? "Loading..." : "Search"}
          onPress={() => this.props.onPressSearch(this.state.searchTerm)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 10
  },
  button: {
    height: 40,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:5
  },
  buttonTextStyle: {
    color:'white',
    height: 24,
    fontSize: 18,
    alignSelf: 'center'
  }
});
