import * as actions from './actions';

export default function(state, action) {
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