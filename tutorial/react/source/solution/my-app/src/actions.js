
export const YOUTUBE_SEARCH = 'YOUTUBE_SEARCH';
export const YOUTUBE_RESPONSE = 'YOUTUBE_RESPONSE';
export const SELECT_VIDEO = 'SELECT_VIDEO';

export const youtubeSearch = searchTerm => {
    return {
      type: YOUTUBE_SEARCH,
      searchTerm
    };
};

export const youtubeResponse = videos => {

    return {
        type: YOUTUBE_RESPONSE,
        videos
    };
};

export const selectVideo = video => {
  return {
      type: SELECT_VIDEO,
      video
  }
};