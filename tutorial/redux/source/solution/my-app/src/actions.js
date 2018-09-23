/* Actions */

export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';
export const YOUTUBE_RESPONSE = 'YOUTUBE_RESPONSE';
export const SELECT_VIDEO = 'SELECT_VIDEO';

/* Action creators */

export const searchYoutube = searchTerm => {
    console.log('Inside action creator searchYoutube', searchTerm);

    return {
        type: SEARCH_YOUTUBE,
        searchTerm
    };
};

export const youtubeResponse = videos => {
    console.log('Inside action creator youtubeResponse', videos);

    return {
        type: YOUTUBE_RESPONSE,
        videos
    };
};

export const selectVideo = selectedVideo => {
    console.log('Inside action creator selectVideo', selectedVideo);

    return {
        type: SELECT_VIDEO,
        selectedVideo
    };
};