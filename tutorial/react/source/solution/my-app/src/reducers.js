import {YOUTUBE_SEARCH, YOUTUBE_RESPONSE, SELECT_VIDEO} from './actions';

export default function (state, action) {
    switch (action.type) {
        case YOUTUBE_SEARCH:
            return {...state, searchTerm: action.searchTerm, loading: true};

        case YOUTUBE_RESPONSE:
            return {...state, videos: action.videos, loading: false};

        case SELECT_VIDEO:
            return {...state, selectedVideo: action.video}

        default:
            return state;
    }
}