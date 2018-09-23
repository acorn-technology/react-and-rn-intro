import * as actions from './actions';

const initialState = {
    searchTerm: '',
    videos: [],
    selectedVideo: null
};

export default function(state = initialState, action) {
    console.log('Inside the reducer with state ', state, 'and action', action);

    switch (action.type) {
        case actions.SEARCH_YOUTUBE:
            return {...state, searchTerm: action.searchTerm};
        case actions.YOUTUBE_RESPONSE:
            return {...state, videos: action.videos};
        case actions.SELECT_VIDEO:
            return {...state, selectedVideo: action.selectedVideo};
        default:
            return state;
    }
}