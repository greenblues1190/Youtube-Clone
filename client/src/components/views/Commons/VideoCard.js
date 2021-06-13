import React from 'react';
import moment from 'moment';

function VideoCard(props) {
  let duration = moment.duration(Math.floor(props.video.duration), 'seconds');
  let updatedTimeFromNow = moment(props.video.createdAt).fromNow();

  console.log(duration);

  return (
    <div className="justify-between m-2">
      <a href={`/video/${props.video._id}`} >
        <div className="flex flex-col h-full max-w-lg mx-auto rounded shadow-lg">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9">
              <img
                className="object-cover w-full rounded rounded-b-none"
                src={`http://localhost:5000/${props.video.thumbnail}`}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 right-0 m-2">
              <div className="flex justify-between">
                <span
                  className="flex h-min space-x-1 items-center rounded-full text-gray-400 bg-gray-900 bg-opacity-50 py-1 px-2 text-xs font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-white font-semibold text-xs">
                    {duration.get("hours") >= 1 ?
                      <span>{duration.get("hours")}:{duration.get("minutes")}:{duration.get("seconds")}</span> : <span>{duration.get("minutes")}:{duration.get("seconds")}</span>
                    }
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="py-2 px-4">
            <h1
              className="text-lg leading-6 tracking-wide break-all line-clamp-2"
            >
              {props.video.title}
            </h1>
          </div>
          <div className="flex flex-row items-end h-full w-full px-4 mt-2">
            <div className="flex border-t border-gray-100 w-full py-4">
              <div
                className="flex items-center space-x-3 w-full"
              >
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src={props.video.writer.image}
                  alt="profile users"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold tracking-wide">
                    {props.video.writer.name}
                  </p>
                  <p className="text-xs tracking-wider text-gray-400">
                    {props.video.views} views • {updatedTimeFromNow}
                  </p>
                </div>
              </div>
              {/* <div className="flex items-center flex-shrink-0 px-2">
                <div className="flex items-center space-x-1 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p className="font-medium">10</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default VideoCard