---
presentation:
  width: 1440
  height: 1280
  controls: false
---
<!-- slide align="left" -->
React & React Native
"Learn Once, Write Anywhere"

<!-- slide align="left" -->
### What is React-Native?

* Javascript engine for Mobile with direct hooks to native components supported on the mobile platform.
* iOS, Android, ~~Windows Phone~~
* A React-Native App has ~~no~~ limitation~~s~~, as its support for native libraries means if you are lacking native support, you can implement it yourself.  <span style="font-size: 0.5em;">This is a lie - it is not suitable for anything with dynamic animations based on user feedback, like games, **yet**...</span>

#### Motto
~~Write Once, Run Anywhere~~
Learn Once, Write Anywhere

<!-- slide align="left" -->
### Where does it come from?

- Developed by Facebook
- Dogfooded by Facebook for Facebook app, Messenger, etc.
- Released open-source by Facebook to the world on one condition:
  - *You may not sue Facebook for patent infringement*
- Used by Facebook, WIX, Instagram, Uber, Discord, Bloomberg, Discovery VR, ...

![using rn](images/whos_using_rn.png)

<!-- slide align="left" -->
### How does it work I ?
![architecture](images/rn_architecture.png)

<!-- slide align="left" -->
### How does it work II ?
<img src ="images/rn_architecture.png" height="500"></img>
- Runtime Environment: Javascript Core
- Most React-Native controls interact with a native counterpart
  - Pure-javascript components are obviously also supported and inherently cross-platform (but with a performance penalty, and they won't "look" native)
- React Native provides the bridge between JS and native
  - Events passed through the bridge between JS and native
- Native code runs in its own thread, so it won't block the UI thread.
  - Animations, scrolling, maps, sound, video, etc, run with "native" performance with native look.

<!-- slide align="left" -->
### How does it work III ?
<img src ="images/rn_architecture.png" height="500"></img>
- Pure Android/iOS application is compiled from source and deployed to phone. This application includes all necessary native components, including native Java/Kotlin/Obj-C/Swift/C++ libraries needed by the javascript.
- Node web server runs which holds all of the React-Native JavaScript code.
- In Debug mode, the JavaScript code bundled and transferred from the development PC to the phone via USB/WIFI/Ethernet/etc...
  - This enables **live reload** and **hot reload** on changes to the JavaScript UX.
- In Release mode, the JavaScript code is bundled as a blob included in the release app.

<!-- slide align="left" -->
### Why use React-Native (Pros)
- Rapid development
- Learn once, write anywhere
- "Normal" apps are not limited by the provided RN API
  - Huge community of 3rd party modules
  - Roll your own native modules
- Lean UX development (hot reloading speeds UX development)
- Share pure javascript code between server and client
- One development team needed with Javascript competence, rather than separate Android/iOS teams
- Use native views, buttons, lists, video-players, camera app, gallery app, maps, etc.
- Distribute javascript code independently of app ("Expo").

<!-- slide align="left" -->
### React Native vs Expo
#### React Native
- A React Native project is created using react-native init <project_name>
- React Native project generates native Android and XCode projects in your new project directory which can be compiled from raw source code.
- Projects can be compiled in XCode/Android Studio, you can modify the React Native library code, you can add libraries, etc.
- You may need to know more about React Native than you really want to.
- Extra functionality is added with package managers via "yarn add <module>" or "npm install <module>"

#### Expo
- An Expo project is created using create-react-native-app <project_name>
- An Expo project runs in the Expo App, a prebuilt app which can be downloaded from Google Play or iOS App Store.
- The Expo App is a pre-built react-native app including many native modules not included in default react-native template project.
  - camera, push notifications, vector icons, etc...
- Expo's own build servers can be used to generate Android and iOS apps for release on Google Play or the iOS App Store.
- Must do "expo eject" if you want to modify any native libraries or add native code.
  - generates the android/ and xcode/ libraries including the open source expo app source code.

<!-- slide align="left" -->
### Example App 1

Create a first app and open the generated folder in Atom.

```sh
react-native init tutorial_1
```

##### 1.0.1 THEY BROKE STUFF YESTERDAY. DO THIS**

If you have a yarn.lock in your project directory, do this:

```bash
yarn add @babel/plugin-external-helpers --dev
yarn add react-transform-hmr
```

Otherwise (package.lock) use npm.

```bash
npm install --save-dev @babel/plugin-external-helpers
npm install --save react-transform-hmr
```

##### 1.0.2 THEY BROKE MORE STUFF YESTERDAY. DO THIS IF YOU HAVE UPGRADED TO XCODE10 AND WANT TO BUILD IN IOS**
1. Open the project in XCode
1. Go to File > Project Settings
1. Change Build System to Legacy Build System

<!-- slide align="left" -->

In Atom, open the newly created "tutorial_1" folder.

Copy and paste this code over your App.js code for a basic example of how to use a native ListView component on both Android and iOS.

```javascript
import React, {Component} from 'react';
import {Text, View, ListView} from 'react-native';

export default class App extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let numbers = [...Array(100)];
    numbers.map((value, index, array)=>{array[index] = index.toString();})
    this.state = {
      ds: ds.cloneWithRows( numbers )
    };
  }
  render() {
    return (
      <View>
        <Text style={{height: 50}}></Text>
        <ListView
          dataSource={this.state.ds}
          renderRow={(rowData:string, unused:string, index:string) =>
              <Text>  Row {index} = {rowData}</Text>}
        >
        </ListView>
      </View>
    );
  }
}
```

<!-- slide align="left" -->
### Reload the app to see changes

You need to reload the app to see any changes:

#### IOS or Android Device
- Reload the app: Shake your phone, select "Reload"
  - Android: You can also type "adb shell input keyevent 82" to "press the settings button"
#### IOS Simulator reload
- Click on the simulator and press CMD+R
#### Android Simulator reload
- Click on the simulator and press CTRL+M(win)/CMD+M(osx)

Then click on "Reload"
<img src="images/app1_screenshot.png" height=700/>

<!-- slide align="left" -->
#### Breakdown of the first app, part 1/2

Import what is needed from react and react native.
```javascript
import React, {Component} from 'react';
import {Text, View, ListView} from 'react-native';
```
Export the App Component by default to any Components which import this file.

```javascript
export default class App extends Component {  
```
Create a constructor that creates a ListView datasource with 100 elements in it.
```javascript
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let numbers = [...Array(100)];
    numbers.map((value, index, array)=>{array[index] = index.toString();})
    this.state = {
      ds: ds.cloneWithRows( numbers )
    };
  }
```

<!-- slide align="left" -->
#### Breakdown of the first app, part 2/2

The react-native knows to call the render function in each component.
```javascript
  render() {
    // return JSX which defines the screen based on current state and props.
    return (
      <View>
        <Text style={{height: 50}}></Text>
        <ListView
          dataSource={this.state.ds}
          renderRow={
            (rowData:string, unused:string, index:string) =>
              (<Text>  Row {index} = {rowData}</Text>)
          } />
      </View>
    );
  }
}
```
The render() function returns the `<jsx></jsx>` which defines the screen.
The list view component's props expect a function (renderRow) which knows how to display each row. We define this here too.
The renderRow() property is set to a lambda which prints the row number, and the rowData.

<!-- slide align="left" -->
### Live Reload and Hot Reload

#### Live Reload

- Watches your project file system for changes
- Automatically reloads the javascript bundle from scratch any time you save a file.  
- Useful if you are changing app logic that can effect global app state, where Hot Reload would fail.
- If you are tweaking a screen's layout, may require re-navigating to that screen on every change.

#### Hot Reload

- Watches your project file system for changes
- Updates the current screen without reloading the whole app
- Useful if you are only changing rendering components such as layouts, fonts, images, icons, colours, sizes, etc, that don't affect global app state.
- Sometimes, the app will fail on a hot reload as a new state variable is added or removed
  - Full app reload will restore the state.

<!-- slide align="left" -->
### Let's enable Live Reload

- Enable live reloading
  - Open the debug menu:
    - [Shake the Phone](#reload-the-app-to-see-changes)
    - Select "Enable Live Reload"
    - ![live reload](images/debug_menu.png)
- Now any time you make a change to the app and save it, your app will reload automagically.  Make a small change to your App.js and see that it reloads.

<!-- slide align="left" -->
### Example App 2 - Contact List Code 1/2
We'll now create a fake contact list app, with a button to add a new random contact.
Paste this over the top of your App.js, above the component declaration.

```javascript
import React, {Component} from 'react';
import {Text, View, Button, ListView, Image} from 'react-native';
const first_names = ["Thomas", "Magnus", "Gustav", "Emi", "Emma", "Remya",
"Chris", "Ken", "Carl", "David", "Jörgen", "Johanna", "Anna", "Marie",
"Peter", "Jan", "Jenny", "Helene"];
const last_names = ["A.","B.","C.","D.","E.","F.","G.","H.","I.","J.","K.",
"L.","M.","N.","O.","P.","Q.","R.","S.","T.","U.","V.","W.","X.","Y.","Z."];

function getRandom(max){
  return Math.floor((Math.random() * max));
}
function getName(){
  let rnd = getRandom(first_names.length);
  let name:string = first_names[rnd];
  rnd = getRandom(last_names.length);
  name += " " + last_names[rnd];
  return name;
}
function getPic(){
  let url = "https://picsum.photos/50/50/?image=";
  url += getRandom(200).toString();
  return url;
}
function getNumber(){
  let number = "070";
  for (let i = 0; i < 7;i++){
    number += getRandom(10).toString();
  }
  return number;
}
```

<!-- slide align="left" -->
### Example App 2 - Contact List Code 2/2
Replace the inside of your App component with the following code.
```javascript
  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { contacts:[], ds:[] };
    this.state = this.addOneContact(true);
  }
  addOneContact(isConstructor){
    let contact = {name:getName(), number:getNumber(), pic:getPic()};
    let contacts = [...this.state.contacts, contact];
    let ds = this.ds.cloneWithRows(contacts);
    let newState = {contacts:contacts, ds:ds};
    if (!isConstructor){
      this.setState(newState); // can't call setState from constructor.
    }
    return newState;
  }
  renderRow(rowData, unused, index){
    return (
      <View style={{backgroundColor:'#E0FFFF'}}>
        <Image style={{width: 50, height: 50}} source={{uri: rowData.pic}} />
        <Text>{rowData.name}, {rowData.number}</Text>
      </View>
    );
  }
  render() { return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <ListView style={{flex:1, marginTop:20}} dataSource={this.state.ds}
          renderRow={(rowData, unused, index) => {
            return this.renderRow(rowData, unused, index);}} />
        <Button title="Add One"
          onPress={()=>{this.addOneContact()}} style={{alignSelf:'center'}} />
      </View>);
  }
```

<!-- slide align="left" -->
### It works, but it's ugly
![ugly](images/contacts_ugly.png)

Note the "native" button at the bottom!

Let's fix it up using [Flexbox](https://facebook.github.io/react-native/docs/flexbox)

<!-- slide align="left" -->
### Flexbox

<img src="images/flex-box_img.png" />

- [Facebook's page on Flexbox](https://facebook.github.io/react-native/docs/flexbox) lets you play around with doing app layout with flexbox.

- Flexbox lets you specify app screen layout loosely as ratios of screen or component size in your jsx code, and react-native will take care of stretching, shrinking,  centering, aligning, and wrapping, etc., components for you.

- Flexbox in combination with hot-reload makes rapid UI design possible.

- Here is a [flexbox cheatsheat pdf](http://jonibologna.com/content/images/flexboxsheet.pdf).

- Here is a [one page cheat sheet](https://gapintelligence.com/blog/2017/the-flexbox-one-page-cheat-sheet)

<!-- slide align="left" -->
### Let's use styles and flexbox. ###

- Disable Live Reload
- Enable Hot Reload
- Click "Add One" Button a few times to ensure you have something useful in your app state.
- Replace renderRow() with the following code.
```javascript
renderRow(rowData, unused, index){
  return (
    <View style={{
      backgroundColor:'#E0FFFF',
      margin:1,
      flexDirection:'row',
      alignItems:'center'}}>
      <Image style={{margin:1, width: 51, height: 51}}
        source={{uri: rowData.pic}} />
      <Text style={{flex:1, marginLeft:10}}>{rowData.name}</Text>
      <Text style={{flex:1}}>{rowData.number}</Text>
    </View>
  );
}
```
Play around with the definitions to see if you can make it prettier.

<!-- slide align="left" -->
### Let's call someone.

- We can make the each item into a clickable button by replacing the containing View with a Touchable*
- There are different sorts of touchables, which act as views but have different animation types when clicked, and generate onPress() and onLongPress() events when pressed.
- We can use TouchableOpacity
- Import TouchableOpacity and Alert

```javascript
import {Text, View, Button, ListView, Image, TouchableOpacity, Alert} from 'react-native';
```

<!-- slide align="left" -->
#### Add an alert, and print output to console.
```javascript
renderRow(rowData, unused, index){
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
```
Pressing a contact results in a platform-native alert window with two buttons.
![alert](images/calling_alert.png)

<!-- slide align="left" -->
#### Where's the debug console? 1/3

If we want to debug the javascript, or see the console, we can use Chrome as a debugger....

- [Shake the Phone](#reload-the-app-to-see-changes)
- Select "Debug JS Remotely"
- Chrome should open a new tab
![debug 1](images/debug_console_1.png)

<!-- slide align="left" -->
#### Where's the debug console? 2/3

Select "..."-->"More Tools"-->Developer Tools
![debug 2](images/debug_console_2.png)

<!-- slide align="left" -->
#### Where's the debug console? 3/3
![debug 3](images/debug_console_3.png)

- You can add your folder to the workspace to click through and edit code directly from chrome. (Be sure to allow chrome access in the pop up which will appear!)
- You can set breakpoints from within chrome.
- Now make a call, and you will see the call printed in the console.

<!-- slide align="left" -->
### Flow 1/6
- Flow-type is similar to Microsoft TypeScript
- Supported by atom/nuclide if you followed the [prerequisites](prerequisites.md)
- Supports static error and type checking of all flow-enabled source code
- Enabled by adding @flow at the top of the document
- Let's "flow-ize" the app so we can catch errors when writing code instead of crashing suddenly while running code.

<!-- slide align="left" -->
### Flow 2/6
Add @flow to the top of **App.js**. This tells flow that you have introduced Flow types to the file and that it should start throwing errors on the file.
```javascript
/** @flow */
```
- If flow is running correctly, you should start seeing squiggly lines in the code.
- Define parameter types and return types on all functions at the top of the file. (just copy and paste from here)
```javascript
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
```

<!-- slide align="left" -->
### Flow 3/6
Define the types used by the App Component above the Component declaration.

```javascript
// Flow type declarations
type Contact = {name: string, number:string, pic:string}; // Contact object
type Props = {}; // Expect no incoming props
type State = { contacts: Array<Contact>, ds:any}; // Component state
```

Use Props and State in Component Declaration
Declare objects used by the class.
```javascript
// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State;
  ...
}
```

<!-- slide align="left" -->
### Flow 4/6
Update types passed into the addOneContact() and renderRow() components
```javascript
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
```

<!-- slide align="left" -->
### Flow 5/6
Make some mistakes in the code and see what happens in the IDE
![flow error](images/flow_error_catch.png)
Flow also enables auto-complete in javascript code.  Type the object name for a known type, and Atom with Nuclide will provide appropriate autocomplete selections.

<!-- slide align="left" -->
### Flow 6/6

**Flow and Windows**
Flow is BAD on windows. A workaround is to host the files on an OSX or Linux machine running nuclide server (`npm install -g nuclide`), run the nuclide Atom plugin in atom (`apm install nuclide`), then open a "remote" project in Atom.  Flow then works flawlessly.

<img src="images/add_remote_folder.png" height=450 />

Another workaround is to use [typescript](https://www.typescriptlang.org/) instead of flow, but these conflict, so for this tutorial I have chosen to show flow.  You need to choose before starting your own RN project.

<!-- slide align="left" -->
#### AcornTube - a crappier Youtube
Add some new dependencies to support AcornTube and start rebuilding

1. Using Yarn (if you have yarn.lock in your project directory)
```bash
yarn add react-native-elements react-native-vector-icons --save
yarn add youtube-api-search react-native-youtube --save
```

2. OR Using NPM (if you have package.lock in your project directory)
```bash
npm install --save react-native-elements react-native-vector-icons
npm install --save youtube-api-search react-native-youtube
```

Resulting package.json extract
```json
  "dependencies": {
    ...
    "react-native-elements": "^0.19.1",
    "react-native-vector-icons": "^5.0.0",
    "react-native-youtube": "^1.1.0",
    "youtube-api-search": "^0.0.5"
  },
```

3.2 Link step: (adds the native parts to your Android and iOS projects)
```bash
react-native link
```
If you need to support iOS as well, linking youtube player requires an extra step:
`npm install -g rnpm` && `rnpm link`

Finally: `react-native run-ios` or `react-native run-android`

<!-- slide align="left" -->
#### AcornTube- Component structure
Our app will contain three main components, a header, a search-bar and a list of videos(search results).
```
App
 +-- Header
 +-- SearchBar /- inputfield - button
 +-- VideoList
```
Import Header in our **App.js** file, and add a new `Header` element
```javascript
import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

// Stylesheet, like CSS
const styles = StyleSheet.create({
  container: {flex:1, alignItems: 'stretch'},
});

export default class App extends Component {
  render() {  
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: 'white'}}}
          outerContainerStyles={{backgroundColor: 'red'}}
        />
      </View>
    );
  }
}
```
We imported StyleSheet. A StyleSheet is like CSS in html. It lets you define the "styles" used in a component or (if exported) an entire app.

<!-- slide align="left" -->
#### AcornTube- It Begins
Now your application should look like this:
<img src="images/screenshot_just_header.png" height=1000 />

<!-- slide align="left" -->
#### AcornTube- SearchBar.js 1/2

Create an additional files beside App.js called SearchBar.js (`touch SearchBar.js` or use Atom-->RightClickInProject-->New-->File-->SearchBar.js)

Our search bar consists of two parts, an input field and a button, wrapped in a 'View' component.  

- Copy this code to the top of SearchBar.js.

```javascript
/* @flow */
import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

// StyleSheet, like CSS
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray', borderBottomWidth: 1, flex: 1, marginLeft: 10
  },
  button: {
    height: 40, marginBottom: 8, flexDirection: 'row', alignItems: 'center',
    borderRadius:5
  },
  buttonTextStyle: {
    color:'white', height: 24, fontSize: 18, alignSelf: 'center'
  }
});
```
<!-- slide align="left" -->
#### AcornTube- SearchBar.js 2/2
The search bar has a text input followed by a button to trigger the search.

- Copy this code to the bottom of SearchBar.js

```javascript
type Props = {onPressSearch:Function, loading:boolean};
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
          textStyle={styles.buttonTextStyle}
          title="Search"
          onPress={() => this.props.onPressSearch(this.state.searchTerm)}
        />
      </View>
    )
  }
}
```
<!-- slide align="left" -->
#### AcornTube- Import SearchBar.js

Lets go back to **App.js** and import our new SearchBar component.

Add an import for SearchBar to the top of **App.js**
```javascript
import { SearchBar } from './SearchBar';
```

Add the SearchBar component to the render() function, but log searches to the console.
```jsx
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: 'white'}}}
          outerContainerStyles={{backgroundColor: 'red'}}
        />
        <SearchBar
          onPressSearch={(searchTerm:string)=> console.log('Searching for ' + searchTerm)}
        />
      </View>
    );
  }

```
<!-- slide align="left" -->
#### AcornTube- What's it Look Like?
If we run it now it will look like this:
<img src="images/with_searchbar_2.png" height=800 />

<!-- slide align="left" -->
#### AcornTube- Let's Start Searching
Enable Flow
Import YTSearch, a module we can use for searching youtube...
Use API_KEY created in the [first tutorial]((https://github.com/appsupport-at-acorn/react-and-rn-intro/tree/master/tutorial/react))
Import additional components which will be useful.
```javascript
/** @flow */
import React, {Component} from 'react';
import { Text, View, Button, ListView, Image,
  TouchableOpacity, StyleSheet} from 'react-native';
import { Header, Card } from 'react-native-elements';
import { SearchBar } from './SearchBar';
import YTSearch from 'youtube-api-search';

const API_KEY = 'YOUR_API_KEY_HERE' ; //'AIzaSyDNuniWTHCHeuq4ZxK-WWbO0pENHYMMCMs'

```
Add some more styles to use for search results, and define types for search results.
```javascript
// Stylesheet, like CSS
const styles = StyleSheet.create({
  container: {flex:1, alignItems: 'stretch'},
  listview: {flex:1, marginTop:20},
  card: { padding: 5 },
  image: { alignSelf: 'stretch', height: 180 },
  textBox: { flex: 1, padding: 1 },
  title: { fontSize: 12, },
  channel: { fontSize: 11, color: '#777', alignSelf: 'flex-end' },
  description: { fontSize: 10, alignSelf: 'center' }
});
```

<!-- slide align="left" -->
#### AcornTube- Let's Start Searching

Paste some Flow definitions above the Component declaration for state variables to keep track of when the YouTube search is searching and when a video is playing (not used yet...)

```javascript

// Flow type declarations
type Video = {etag: string, kind:string, id:Object, snippet:Object };
type Props = {};
type State = {
  ds:any,
  videos: Array<Video>,
  loading:boolean,
  lastSearchTerm:string,
  playingVideo:?Video
};

```

<!-- slide align="left" -->
#### AcornTube - App.js - Let's Start Searching

Create a datasource and add/construct the list of videos to the App component.

```javascript

// Class declaration including the component types.
export default class App extends Component<Props, State> {
  ds:any;
  state:State;

  constructor() {
    super()
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {videos:[], ds:this.ds.cloneWithRows([]), loading:false, lastSearchTerm:"", playingVideo:null };
  }
  // Function called when search button is pressed.
  onPressSearch(searchTerm:string) {
    this.setState({loading: true, lastSearchTerm:searchTerm});
    YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
      let ds = this.ds.cloneWithRows(videos);
      this.setState({loading: false, videos: videos, ds:ds, playingVideo:null});
    })
  }
```
<!-- slide align="left" -->
#### AcornTube - App.js - Start Searching 2/3

Create a function that can render a "Card" for each incoming video, and call it from the renderRow() function.

```javascript
renderCardForVideo(video:Video){
  return (
    <TouchableOpacity style={{
      flex:1, alignSelf:'stretch'}}
      onPress={()=>{this.setState({playingVideo:video})
      }}>
      <Card containerStyle={styles.card}>
        <Image style={styles.image}
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
    </TouchableOpacity>
  );
}

renderRow(video:Video, unused:string, index:string){
  return this.renderCardForVideo(video);
}
```

<!-- slide align="left" -->
#### AcornTube - App.js - Start Searching 3/3

Add a ListView which can render each search result.

```javascript
  render() {
    const {loading, videos, lastSearchTerm, ds} = this.state;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{text: 'AcornTube', style: {color: 'white'}}}
          outerContainerStyles={{backgroundColor: 'red'}}
        />
        <SearchBar
          loading={loading}
          onPressSearch={(searchTerm:string)=>{this.onPressSearch(searchTerm);}}
        />
        <ListView style={styles.listview}
          enableEmptySections={true}
          dataSource={ds}
          renderRow={(rowData, unused, index) => {
                     return this.renderRow(rowData, unused, index);
          }}
        ></ListView>
      </View>
    );
  }
}

```

Now type something in to the search bar, press Search, and see what happens...

<!-- slide align="left" -->
#### AcornTube - Fancy Native Refresh Control.

In **App.js**, import the native RefreshControl component from React-Native
```javascript
import { Text, View, Button, ListView, Image,
  TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
```

Update the ListView component to add a RefreshControl
```jsx
<ListView style={styles.listview}
  enableEmptySections={true}
  dataSource={ds}
  refreshControl={ <RefreshControl refreshing={loading}
                   onRefresh={()=>{this.onPressSearch(lastSearchTerm)}} >
                   </RefreshControl> }
  renderRow={(rowData, unused, index) => {
             return this.renderRow(rowData, unused, index);
  }}
></ListView>
```

Now do a new search and watch the fancy native animations.
Pull down on the ListView and see what happens.

<!-- slide align="left" -->
#### AcornTube - Make it Play

- Import react-native-youtube to App.js
```javascript
import YouTube from 'react-native-youtube';
```

- Create some styling for the youtube video player.
```javascript
// Stylesheet, like CSS
const styles = StyleSheet.create({
  ...,
  youtube: { alignSelf: 'stretch', height: 300 }
});
```

<!-- slide align="left" -->
#### AcornTube - Make it Play 2

Update renderRow with some simple logic...
```javascript
If there is no video playing or this is not the currently playing video,
  show the card.
Else
  show the youtube video component
```

The code

```javascript
  renderRow(video:Video, unused:string, index:string){
    if ((null === this.state.playingVideo) || (video.etag !== this.state.playingVideo?.etag)){
      return this.renderCardForVideo(video);
    }
    else {
      return (
        <YouTube
          apiKey={API_KEY}
          videoId={video.id.videoId}   // The YouTube video ID
          play={true} controls={2}
          style={styles.youtube}
        /> )
    }
  }
```

<!-- slide align="left" -->
#### AcornTube - Tweak the SearchBar

Let's add an icon to the SearchBar button and update its text when it is searching...

```jsx
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
```

<!-- slide align="left" -->
#### AcornTube - Result

<img src="images/acorntube_final.png" height=800 />

<!-- slide align="left" -->
### Expo Test (inst-a-corn)

If we get here, then we were REALLY fast.

Let's test a simple instagram clone including shared server interface (Fire.js), some shared screens (FeedScreen.js, NewPostScreen.js, SelectPhotoScreen.js) and access to the camera, using Expo.

```sh
git clone https://github.com/appsupport-at-acorn/rn-tutorial-instagram-clone instacorn
cd instacorn
```
Update the node_modules directory using yarn or npm
```sh
yarn
```
or
```sh
npm install
```

Run it

```sh
expo start
```

<!-- slide align="left" -->
Instacorn Screenshot
<img src="images/instacorn_screenshot.png" height=800 />

We are using a private "Acorn" firebase database - could become a fun chat app for us Acornites with a little work!

<!-- slide align="left" -->
#### AcornTube Episode I

If we get here we were REALLY, REALLY fast.

Gustav Alholt has made the "mark 1" version of the youtube tutorial. It has more in common with the initial [React Tutorial](https://github.com/appsupport-at-acorn/react-and-rn-intro/tree/master/tutorial/react).  You can get it here:
```bash
git clone https://github.com/Glottris/-expo_youTube_tutorial
```

I used that code as a jumping off point for the code in this tutorial, but made changes for consistency between earlier portions of this tutorial.

There is a [readme](examples/acorntube_like_first_react_tutorial/readme.md) in that tutorial with instructions on installing, building and running it.

<!-- slide align="left" -->
### React-Native Cons
- Developing in Windows is less than ideal
  - Slow build time
  - Can only build for Android
  - Path length limitations in Windows OS
- **Dependencies must be continually updated**
  - Android Dependencies
    - Android Studio, Android Build Tools, Gradle, Java, Kotlin, Gradle, Gradle, Gradle
  - XCode Dependencies
    - Swift language, Swift libraries, Swift deprecation
  - RN Dependencies.
    - Need latest RN to support latest XCode to support latest iPhone, but latest RN breaks native module camera, GPS, and maps.
    - Need latest RN to support latest Android Studio, but that breaks native module soundplayer, imageshrinker, and cow pusher.
  - Workaround 1: Most 3rd party modules are published on github, so you can wait until the author publishes a fix, or fix it yourself and be a hero.
  - Workaround 2: Wait before upgrading your build tools/XCode/Android Studio
  - Workaround 3: Lock all native module versions and javascript in your package.lock.
  - Workaround 4: Use **Expo**
