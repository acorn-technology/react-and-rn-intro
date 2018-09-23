import React, {Component} from 'react';
import { connect } from 'react-redux';
import { searchYoutube } from './../actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {searchTerm: ''};
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.searchTerm}
                    onChange={event => this.onInputChange(event.target.value)}/>
            </div>
        );
    }

    onInputChange(searchTerm) {
        this.setState({searchTerm: searchTerm});
        // this.props.onSearchTermChange(searchTerm);

        this.props.searchYoutube(this.state.searchTerm);
        // this.setState({ searchTerm: '' });
    }
}

const mapStateToProps = state => {
    return { searchTerm: state.searchTerm };
};

export default connect(
    mapStateToProps,
    { searchYoutube }
)(SearchBar);
// export default SearchBar;