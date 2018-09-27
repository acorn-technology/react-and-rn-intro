import React, {Component} from 'react';
import SearchBar from './components/search-bar';
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";

class App extends Component {

    render() {
        return (
            <div className="app">
                <SearchBar/>
                <VideoDetail/>
                <VideoList/>
            </div>
        );
    }
}

export default App;
