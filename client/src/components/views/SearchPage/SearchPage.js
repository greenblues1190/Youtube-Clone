import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Axios from 'axios';
import { VIDEO_SERVER } from '../../Config';
import VideoCard from '../Commons/VideoCard';

function SearchPage(props) {
  const [SearchResult, setSearchResult] = useState([]);
  const [Query, setQuery] = useState('');

  useEffect(() => {
    const parsedQuery = queryString.parse(props.location.search);
    setQuery(parsedQuery.query);
    Axios.get(`${VIDEO_SERVER}/search?query=${parsedQuery.query}`)
      .then((res) => {
        setSearchResult(res.data.doc);
      })
  }, [props.location.search])

  return (
    <div className="w-11/12 flex flex-col justify-center divide-y">
      <div className="mt-4">
        <p className="text-3xl mb-4">{SearchResult.length} results for "{Query}"</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
          {SearchResult && SearchResult.length > 0 ?
            SearchResult.filter(video => video.privacy === 1).map((video, index) => (
              <VideoCard
                video={video}
              />
            ))
            :
            (
              <p>no result!</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
