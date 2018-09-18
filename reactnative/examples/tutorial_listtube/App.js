/** @flow */
import React, {Component} from 'react';
import {Text, View, Button, ListView, Image, TouchableOpacity, Alert} from 'react-native';


// Flow type declarations
type Contact = {name: string, number:string, pic:string};
type Props = {};
type State = { contacts: Array<Contact>, ds:any};

// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State = { contacts:[], ds:[] };

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { contacts:[], ds:[] };
    this.state = this.addOneContact(true);
  }
  addOneContact(isConstructor:?boolean):State{
    let contact:Contact = {name:getName(), number:getNumber(), pic:getPic()};
    let contacts = [...this.state.contacts, contact];
    let ds = this.ds.cloneWithRows(contacts);
    let newState:newState = {contacts:contacts, ds:ds};
    if (!isConstructor){
      this.setState(newState);
    }
    return newState;
  }
  renderRow(rowData:Contact, unused:string, index:string){
    return (
      <TouchableOpacity style={{backgroundColor:'#E0FFFF', margin:1,
        flexDirection:'row', alignItems:'center'}}
        onPress={()=>{
          Alert.alert(
            'Calling ' + rowData.name,
            'Are you sure?',
            [
              {text: 'Cancel', onPress: () => console.log('Call Canceled')},
              {text: 'OK', onPress: () => console.log('Called ' + rowData.name)},
            ],
          )
        }}
        >
        <Image style={{margin:1, width: 51, height: 51}}
          source={{uri: rowData.pic}} />
        <Text style={{flex:1, marginLeft:10}}>{rowData.name}</Text>
        <Text style={{flex:1}}>{rowData.number}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <ListView style={{flex:1, marginTop:20}} dataSource={this.state.ds}
          renderRow={(rowData, unused, index) => {
            return this.renderRow(rowData, unused, index);}} />
        <Button title="Add One"
          onPress={()=>{this.addOneContact()}} style={{alignSelf:'center'}} />
      </View>
    );
  }
}
