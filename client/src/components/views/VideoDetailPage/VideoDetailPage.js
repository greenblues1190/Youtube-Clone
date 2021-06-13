import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { VIDEO_SERVER } from '../../Config';

function VideoDetailPage(props) {
  let videoId = props.match.params.videoId;
  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post(`${VIDEO_SERVER}/getVideoDetail`, { videoId: videoId })
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          setVideoDetail(res.data.videoDetail);
        } else {
          alert("비디오 정보를 가져오는데 실패했습니다.");
        }
      })
  }, [])

  if (VideoDetail.writer) {
    return (
      <div className="w-11/12 flex flex-col justify-center divide-y pb-12">
        <div class="grid grid-cols-4 gap-4 mt-4">
          {/* Video Section */}
          <div className="flex flex-col col-start-1 md:col-span-3 col-span-4">
            {/* Video Player */}
            <div className="aspect-w-16 aspect-h-9">
              <video className="w-full object-contain bg-black" src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
            </div>
            {/* Video Metadata */}
            <div className="border-b">
              <h1
                className="text-lg leading-6 tracking-wide break-all line-clamp-2 my-4"
              >
                {VideoDetail.title}
              </h1>
              <div
                className="flex items-center space-x-3 w-full my-4"
              >
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src={VideoDetail.writer.image}
                  alt="profile users"
                  loading="lazy"
                />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold tracking-wide">
                    {VideoDetail.writer.name}
                  </p>
                  <p className="text-xs tracking-wider text-gray-400">
                    {VideoDetail.views} views • {moment(VideoDetail.createdAt).format("MMM Do YY")}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-4">
              comment Section
            </div>

          </div>

          {/* Side List Section */}
          <div className="col-end-5 md:col-span-1 col-span-4">
            Side List
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>...loading</div>
    )
  }

}

export default VideoDetailPage
