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
        setSearchResult(res.data.filteredDoc);
        console.log(res.data);
      })
  }, [props.location.search])

  const renderCards = (videos) => videos.map(video => {
    return (
      <VideoCard
        video={video}
      />
    )
  });

  return (
    <div className="w-11/12 flex flex-col justify-center divide-y">
      <div className="mt-4">
        <h2 className="text-3xl mb-4">{SearchResult.length} results for "{Query}"</h2>
        {SearchResult && SearchResult.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
            {renderCards(SearchResult)}
          </div>
          :
          <div className="w-full flex flex-col items-center space-y-6 my-24 text-gray-500">
            <svg height="256" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Blue"><path d="m25 7h14v14h-14z" fill="#cdeef6"/><path d="m29 10h2v2h-2z" fill="#4f83d1"/><path d="m33 10h2v2h-2z" fill="#4f83d1"/><path d="m36 18h-2a2 2 0 0 0 -4 0h-2a4 4 0 0 1 8 0z" fill="#4f83d1"/><path d="m24 10h1a0 0 0 0 1 0 0v6a0 0 0 0 1 0 0h-1a3 3 0 0 1 -3-3 3 3 0 0 1 3-3z" fill="#cdeef6"/><path d="m42 10h1a0 0 0 0 1 0 0v6a0 0 0 0 1 0 0h-1a3 3 0 0 1 -3-3 3 3 0 0 1 3-3z" fill="#cdeef6" transform="matrix(-1 0 0 -1 82 26)"/><path d="m25 3h14v4h-14z" fill="#7cb8eb"/><path d="m19 28-4 6-5-4h-4a2 2 0 0 0 -2 2 2 2 0 0 0 2 2h2l8 6 6-9z" fill="#cdeef6"/><path d="m38 25h-12l-7 3 5 5v14h16v-14l5-5z" fill="#7cb8eb"/><path d="m45 28 4 6 5-4h4a2 2 0 0 1 2 2 2 2 0 0 1 -2 2h-2l-8 6-6-9z" fill="#cdeef6"/><path d="m23.697 31h3.606v2h-3.606z" fill="#4f83d1" transform="matrix(.832 -.555 .555 .832 -13.468 19.519)"/><path d="m37.5 30.197h2v3.606h-2z" fill="#4f83d1" transform="matrix(.555 -.832 .832 .555 -9.482 46.284)"/><path d="m28 47v4a3 3 0 0 1 -3 3h-1v7h8v-14z" fill="#cdeef6"/><path d="m24 47-5 2-3 5a2.19 2.19 0 0 0 1 3c2 1 4-3 4-3h4a3 3 0 0 0 3-3v-4z" fill="#fff"/><path d="m20.197 51.5h3.606v2h-3.606z" fill="#4f83d1" transform="matrix(.555 -.832 .832 .555 -33.886 41.683)"/><path d="m36 47v4a3 3 0 0 0 3 3h1v7h-8v-14z" fill="#cdeef6"/><path d="m40 47 5 2 3 5a2.19 2.19 0 0 1 -1 3c-2 1-4-3-4-3h-4a3 3 0 0 1 -3-3v-4z" fill="#fff"/><path d="m41 50.697h2v3.606h-2z" fill="#4f83d1" transform="matrix(.832 -.555 .555 .832 -22.068 32.115)"/><path d="m59 44a1 1 0 0 1 -.707-.293l-2-2 1.414-1.414 1.293 1.293 1.293-1.293 1.414 1.414-2 2a1 1 0 0 1 -.707.293z" fill="#4f83d1"/><path d="m16 23a1 1 0 0 1 -.707-.293l-2-2 1.414-1.414 1.293 1.293 1.293-1.293 1.414 1.414-2 2a1 1 0 0 1 -.707.293z" fill="#4f83d1"/><path d="m9 26a1 1 0 0 1 -.707-.293l-2-2 1.414-1.414 1.293 1.293 1.293-1.293 1.414 1.414-2 2a1 1 0 0 1 -.707.293z" fill="#4f83d1"/><path d="m52.379 57.068a14.036 14.036 0 0 1 -1.489-.074l.219-1.988c1.374.151 4.474.082 5.288-1.09a1.479 1.479 0 0 0 .189-1.1 5.019 5.019 0 0 1 -5.293-1.111 2.757 2.757 0 0 1 -.64-2.978 2.973 2.973 0 0 1 2.632-1.894c.872-.06 2.509.281 4.031 2.688a7.778 7.778 0 0 0 .684-3.521h2c0 2.855-.78 4.56-1.675 5.573a3.728 3.728 0 0 1 -.288 3.488c-1.194 1.713-3.925 2.007-5.658 2.007zm1.054-8.237h-.053a.974.974 0 0 0 -.861.619.743.743 0 0 0 .188.842 3.011 3.011 0 0 0 3.139.667c-.767-1.347-1.646-2.128-2.413-2.128z" fill="#4f83d1"/><path d="m28 25 4 6 4-6z" fill="#cdeef6"/><g fill="#4f83d1"><path d="m31 34h2v2h-2z"/><path d="m31 38h2v2h-2z"/><path d="m31 42h2v2h-2z"/><path d="m29 10h2v2h-2z"/><path d="m33 10h2v2h-2z"/><path d="m32 16a2 2 0 0 1 2 2h2a4 4 0 0 0 -8 0h2a2 2 0 0 1 2-2z"/><path d="m40 2h-16v7a4 4 0 0 0 0 8v5h16v-5a4 4 0 0 0 0-8zm-14 2h12v2h-12zm-4 9a2 2 0 0 1 2-2v4a2 2 0 0 1 -2-2zm20 0a2 2 0 0 1 -2 2v-4a2 2 0 0 1 2 2zm-4 7h-12v-12h12z"/><path d="m45.857 48.485a1 1 0 0 0 -.486-.414l-4.371-1.748v-12.909l.845-.844 5.323 7.985a1 1 0 0 0 .663.43.965.965 0 0 0 .169.015 1 1 0 0 0 .6-.2l7.733-5.8h1.667a3 3 0 0 0 0-6h-4a1 1 0 0 0 -.625.219l-4.148 3.319-3.395-5.093a2 2 0 0 0 -.293-.279c-.02-.013-.115-.072-.145-.085l-7-3a.985.985 0 0 0 -.394-.081h-12a.985.985 0 0 0 -.394.081l-7 3c-.03.013-.125.072-.145.085a2 2 0 0 0 -.293.279l-3.395 5.093-4.148-3.319a1 1 0 0 0 -.625-.219h-4a3 3 0 0 0 0 6h1.667l7.733 5.8a1 1 0 0 0 .6.2.965.965 0 0 0 .169-.015 1 1 0 0 0 .663-.43l5.323-7.985.845.844v12.909l-4.371 1.748a1 1 0 0 0 -.486.414l-3.038 5.068a3.145 3.145 0 0 0 1.448 4.347 2.488 2.488 0 0 0 1.108.264 3.832 3.832 0 0 0 2.848-1.634 10.968 10.968 0 0 0 1.079-1.53h1.412v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6h1.412a10.968 10.968 0 0 0 1.079 1.525 3.832 3.832 0 0 0 2.848 1.634 2.488 2.488 0 0 0 1.108-.264 3.159 3.159 0 0 0 1.41-4.41zm2.99-13.5a1.007 1.007 0 0 0 .778-.207l4.726-3.778h3.649a1 1 0 0 1 0 2h-2a1 1 0 0 0 -.6.2l-7.154 5.365-4.959-7.438 1.558-1.558 3.323 4.986a1 1 0 0 0 .679.433zm-14.715-8.985-2.132 3.2-2.132-3.2zm-18.378 12.565-7.154-5.365a1 1 0 0 0 -.6-.2h-2a1 1 0 0 1 0-2h3.649l4.726 3.781a1 1 0 0 0 1.457-.226l3.323-4.986 1.558 1.558zm5-10.228 5.451-2.337h1.26l3.7 5.555a1 1 0 0 0 1.664 0l3.706-5.555h1.265l5.453 2.337-3.375 3.376-2.318-1.545-1.11 1.664 2.55 1.703v12.465h-14v-12.465l2.555-1.7-1.11-1.664-2.318 1.545zm-3.3 27.768a1.126 1.126 0 0 1 -.59-1.59l2.821-4.715 4.507-1.8h2.808v3a2 2 0 0 1 -2 2h-2.132l.964-1.445-1.664-1.11s-3.979 6.031-4.721 5.66zm7.546-1.105a4 4 0 0 0 4-4v-3h2v12h-6zm14 5h-6v-12h2v3a4 4 0 0 0 4 4zm7.553-3.9c-.78.381-4.721-5.66-4.721-5.66l-1.664 1.11.964 1.45h-2.132a2 2 0 0 1 -2-2v-3h2.808l4.508 1.8 2.789 4.643a1.147 1.147 0 0 1 -.552 1.662z"/><path d="m59 41.586-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 1.414 0l2-2-1.414-1.414z"/><path d="m16 23a1 1 0 0 0 .707-.293l2-2-1.414-1.414-1.293 1.293-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 .707.293z"/><path d="m9.707 25.707 2-2-1.414-1.414-1.293 1.293-1.293-1.293-1.414 1.414 2 2a1 1 0 0 0 1.414 0z"/><path d="m58 46a7.778 7.778 0 0 1 -.684 3.523c-1.522-2.407-3.159-2.748-4.031-2.688a2.973 2.973 0 0 0 -2.632 1.894 2.757 2.757 0 0 0 .64 2.978 5.019 5.019 0 0 0 5.293 1.111 1.479 1.479 0 0 1 -.189 1.1c-.814 1.172-3.914 1.241-5.288 1.09l-.219 1.988a14.036 14.036 0 0 0 1.489.074c1.733 0 4.464-.294 5.658-2.007a3.728 3.728 0 0 0 .288-3.488c.895-1.015 1.675-2.72 1.675-5.575zm-5.293 4.293a.743.743 0 0 1 -.188-.842.974.974 0 0 1 .861-.619h.053c.767 0 1.646.781 2.413 2.129a3.011 3.011 0 0 1 -3.139-.668z"/><path d="m31 34h2v2h-2z"/><path d="m31 38h2v2h-2z"/><path d="m31 42h2v2h-2z"/></g></g></svg>
            <p className="block w-max text-2xl text-center">Wow, such empty</p>
            <p className="block w-max text-base text-center">Share the first video about this topic!</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SearchPage
