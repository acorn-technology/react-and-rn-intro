/** @flow */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ListView, Image} from 'react-native';

const first_names = ["Thomas", "Magnus", "Gustav", "Emi", "Emma", "Remya", "Chris", "Ken", "Carl", "David", "Jörgen", "Johanna", "Anna", "Marie", "Peter", "Jan", "Jenny", "Helene"];
const last_names = ["A.","B.","C.","D.","E.","F.","G.","H.","I.","J.","K.","L.","M.","N.","O.","P.","Q.","R.","S.","T.","U.","V.","W.","X.","Y.","Z."];

const borders = {
  borderColor:'blue',
  borderWidth:1
};

function getRandom(max:number):number{
  return Math.floor((Math.random() * max));
}

function getName():string{
  let rnd = getRandom(first_names.length);
  let name:string = first_names[rnd];
  rnd = getRandom(last_names.length);
  name += " " + last_names[rnd];
  return name;
}

function getPic():string{
  let url = "https://picsum.photos/50/50/?image=";
  url += getRandom(200).toString();
  return url;
}

function getNumber():string{
  let number = "070";
  for (let i = 0; i < 7;i++){
    number += getRandom(10).toString();
  }
  return number;
}

type Contact = {name: string, number:string, pic:string};
type Props = {};
type State = { contacts: Array<Contact>, ds:any};
export default class App extends Component<Props, State> {
  ds:any;
  state:State = { contacts:[], ds:null };

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
      <View style={{...borders, flexDirection:'row', alignItems:'center'}}>
        <Image style={{margin:1, width: 51, height: 51}} source={{uri: rowData.pic}} />
        <Text style={{flex:1, marginLeft:10}}>{rowData.name}</Text>
        <Text style={{flex:1}}>{rowData.number}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <Text style={{marginTop:25, height: 50, alignSelf:'center'}}>React Native Demo</Text>
        <ListView style={{flex:1}} dataSource={this.state.ds}
          renderRow={(rowData, unused, index) => {return this.renderRow(rowData, unused, index);}} />
        <Button title="Add One" onPress={()=>{this.addOneContact()}} style={{alignSelf:'center'}} />
      </View>
    );
  }
}
