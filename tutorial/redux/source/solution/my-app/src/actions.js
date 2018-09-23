export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';

export const searchYoutube = content => {
    console.log('inside action creator searchYoutube', content);

    return {
        type: SEARCH_YOUTUBE,
        searchTerm: content
    };
};