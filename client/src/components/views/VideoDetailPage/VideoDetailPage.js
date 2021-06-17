import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment';
import { VIDEO_SERVER } from '../../Config';
import SideCard from './Sections/SideCard';
import Subscribe from './Sections/Subscribe';
import Avatar from '../Commons/Avatar';
import CommentSection from './Sections/CommentSection';

function VideoDetailPage(props) {
  let videoId = props.match.params.videoId;
  const [VideoDetail, setVideoDetail] = useState([]);
  const [RelatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    Axios.post(`${VIDEO_SERVER}/getVideoDetail`, { videoId: videoId })
      .then(res => {
        if (res.data.success) {
          setVideoDetail(res.data.videoDetail);
        } else {
          alert("비디오 정보를 가져오는데 실패했습니다.");
        }
      })

    Axios.get(`${VIDEO_SERVER}/getVideos`)
      .then(res => {
        if (res.data.success) {
          setRelatedVideos(res.data.videos);
        } else {
          alert('비디오 가져오기를 실패하였습니다.');
        }
      })
  }, [])

  const renderSideCards = RelatedVideos.map(relatedVideo => {
    return (
      <SideCard
        video={relatedVideo}
      />
    )
  })

  if (VideoDetail.writer) {
    return (
      <div className="w-11/12 flex flex-col justify-center divide-y">
        <div className="grid grid-cols-6 gap-4 mt-4">
          {/* Video Section */}
          <div className="flex flex-col col-start-1 lg:col-span-4 col-span-6">
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
                className="flex flex-row items-center space-x-3 w-full my-4"
              >
                <Avatar imagePath={VideoDetail.writer.image} size="l" />
                <div className="w-full flex flex-col">
                  <p className="text-sm font-medium tracking-wide">
                    {VideoDetail.writer.name}
                  </p>
                  <p className="text-xs tracking-wider text-gray-400">
                    {VideoDetail.views} views • {moment(VideoDetail.createdAt).format("MMM Do YY")}
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <Subscribe
                  userTo={VideoDetail.writer._id}
                />
                </div>
                
              </div>
            </div>

            <div className="my-4">
              <CommentSection videoId={videoId} />
            </div>

          </div>
          
          {/* Side List Section */}
          <div className="col-end-7 lg:col-span-2 col-span-6 flex flex-col w-full gap-2">
            {renderSideCards}
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
