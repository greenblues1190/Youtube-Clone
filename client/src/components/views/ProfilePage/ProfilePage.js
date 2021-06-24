import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { USER_SERVER, VIDEO_SERVER, SUBSCRIBER_SERVER, LIKE_SERVER } from '../../Config';
import ProfileBox from './ProfileBox';
import VideoCard from '../Commons/VideoCard';
import Subscribe from '../Commons/Subscribe';

function ProfilePage(props) {
  const user = props.user;
  const userId = props.match.params.userId;

  const [UserProfile, setUserProfile] = useState([]);
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [UserVideos, setUserVideos] = useState([]);
  const [LikedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const variable = { userId: userId };

    Axios.post(`${USER_SERVER}/getUserProfile`, variable)
      .then((res) => {
        if (res.data.success) {
          setUserProfile(res.data.doc);
        } else {
          console.error(res)
        }
      })

    Axios.post(`${VIDEO_SERVER}/getUserVideos`, variable)
      .then((res) => {
        if (res.data.success) {
          setUserVideos(
            res.data.userVideos.filter(video => ((!video.isPrivate || user.userData._id === userId) && !video.isDeleted))
          );
        } else {
          console.error(res)
        }
      })

    Axios.post(`${LIKE_SERVER}/getLikedVideos`, variable)
      .then((res) => {
        if (res.data.success) {
          const filteredLikedVideos = res.data.likedVideos.filter(video => ((!video.isPrivate || user.userData._id === userId) && !video.isDeleted))
          setLikedVideos(filteredLikedVideos);
        } else {
          console.error(res)
        }
      })

    // get subscribers number
    if (user.userData) {
      Axios.post(`${SUBSCRIBER_SERVER}/getSubscriberNumber`, { userTo: userId })
        .then(res => {
          if (res.data.success) {
            setSubscriberNumber(res.data.subscriberNumber)
          } else {
            alert("구독자 수 정보를 받아오지 못했습니다.");
          }
        })
    }

  }, [user.userData, userId])

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
        <div className="flex items-center justify-between mb-4">
          <ProfileBox userProfile={UserProfile} subscribers={SubscriberNumber} />
          <div className="w-max">
            {user.userData && <Subscribe userTo={userId} userFrom={user} />}
          </div>
        </div>
        <div className="flex flex-col space-y-6 divide-y">
          <div>
            <h3 className="block font-medium my-6">Uploads</h3>
            {UserVideos && UserVideos.length > 0 ?
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
                {renderCards(UserVideos)}
              </div>
              :
              <div className="w-full h-16 flex justify-center items-center text-gray-500">
                <p>No videos yet!</p>
              </div>
            }
          </div>
          <div>
            <h3 className="block font-medium my-6">Liked</h3>
            {LikedVideos && LikedVideos.length > 0 ?
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
                {renderCards(LikedVideos)}
              </div>
              :
              <div className="w-full h-16 flex justify-center items-center text-gray-500">
                <p>No videos yet!</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
