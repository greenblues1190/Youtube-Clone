import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import { VIDEO_SERVER, SUBSCRIBER_SERVER } from '../../Config';
import SideCard from './Sections/SideCard';
import Subscribe from '../Commons/Subscribe';
import Avatar from '../Commons/Avatar';
import CommentSection from './Sections/CommentSection';
import LikeDislikeButton from '../Commons/LikeDislikeButton';

function VideoDetailPage(props) {
  const user = useSelector(state => state.user);
  let videoId = props.match.params.videoId;
  const [VideoDetail, setVideoDetail] = useState([]);
  const [RelatedVideos, setRelatedVideos] = useState([]);
  const [IsPlayed, setIsPlayed] = useState(false);
  const [SubscriberNumber, setSubscriberNumber] = useState(0);

  useEffect(() => {
    // get video detail
    Axios.post(`${VIDEO_SERVER}/getVideoDetail`, { videoId: videoId })
      .then(res => {
        if (res.data.success) {
          setVideoDetail(res.data.videoDetail);
        } else {
          alert("비디오 정보를 가져오는데 실패했습니다.");
        }
      })

    // get related videos
    Axios.get(`${VIDEO_SERVER}/getVideos`)
      .then(res => {
        if (res.data.success) {
          setRelatedVideos(res.data.videos);
        } else {
          alert('비디오 가져오기를 실패하였습니다.');
        }
      })

    // get subscribers number
    if (user.userData) {
      Axios.post(`${SUBSCRIBER_SERVER}/getSubscriberNumber`, { userTo: user.userData._id })
        .then(res => {
          if (res.data.success) {
            setSubscriberNumber(res.data.subscriberNumber)
          } else {
            alert("구독자 수 정보를 받아오지 못했습니다.");
          }
        })
    }
  }, [user.userData, videoId])

  const renderSideCards = RelatedVideos.map(relatedVideo => {
    return (
      <SideCard
        video={relatedVideo}
      />
    )
  })

  const handlePlaying = () => {
    if (!IsPlayed) {
      setIsPlayed(true);
      Axios.post(`${VIDEO_SERVER}/addView`, { videoId: videoId })
        .then((res) => {
          if (!res.data.success) {
            console.error(res);
          }
        })
    }
  }

  if (VideoDetail.writer) {
    return (
      <div className="w-11/12 flex flex-col justify-center divide-y">
        <div className="grid grid-cols-6 gap-4 mt-4">
          {/* Video Section */}
          <div className="flex flex-col col-start-1 lg:col-span-4 col-span-6">
            {/* Video Player */}
            <div className="flex aspect-w-16 aspect-h-9">
              {(VideoDetail.privacy === 1 || VideoDetail.writer._id === user.userData._id) ?
                < video
                  className="w-full object-contain bg-black"
                  src={`http://localhost:5000/${VideoDetail.filePath}`}
                  poster={`http://localhost:5000/${VideoDetail.thumbnail}`}
                  onPlaying={handlePlaying}
                  controls
                />
                :
                <p className="bg-black text-white"> This video is private </p>
              }
            </div>
            {/* Video Metadata */}
            {(VideoDetail.privacy === 1 || VideoDetail.writer._id === user.userData._id) ?
              <>
                <div className="my-4">
                  {/* Title */}
                  <div className="flex flex-row items-center justify-between gap-4">
                    <h1
                      className="text-lg leading-6 tracking-wide break-all line-clamp-2"
                    >
                      {VideoDetail.title}
                    </h1>
                    {VideoDetail.privacy === 1 ?
                      null
                      :
                      <div className="border rounded-3xl bg-gray-200 px-4 py-1">
                        <p className="text-sm text-gray-500"> Private </p>
                      </div>
                    }
                  </div>
                  {/* Views, Date, Like Dislike Button */}
                  <div className="flex justify-between my-3">
                    <p className="w-max text-sm tracking-wider text-gray-400">
                      {VideoDetail.views} views • {moment(VideoDetail.createdAt).format("MMM Do YY")}
                    </p>
                    <LikeDislikeButton type="video" objectId={videoId} user={user} size="sm" />
                  </div>
                  <hr />
                  {/* Profile, Subscribe Button */}
                  <div className="flex flex-row items-center justify-between space-x-3 my-4">
                    <div className="flex items-center space-x-3">
                      <Link to={`/profile/${VideoDetail.writer._id}`} className="w-max">
                        <Avatar imagePath={VideoDetail.writer.image} size="l" />
                      </Link>
                      <div className="w-max flex flex-col">
                        <Link to={`/profile/${VideoDetail.writer._id}`}>
                          <p className="text-sm font-medium tracking-wide">
                            {VideoDetail.writer.name}
                          </p>
                        </Link>
                        <p className="w-max text-xs tracking-wider text-gray-400">
                          {SubscriberNumber} subscribers
                        </p>
                      </div>
                    </div>
                    <div className="w-max">
                      <Subscribe userTo={VideoDetail.writer._id} userFrom={user} />
                    </div>
                  </div>
                  <p className="text-sm">{VideoDetail.description}</p>
                </div>

                <hr />
                <div className="mt-4">
                  <CommentSection videoId={videoId} />
                </div>
              </>
              :
              <></>
            }

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
