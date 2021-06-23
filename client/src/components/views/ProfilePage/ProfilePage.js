import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { USER_SERVER, VIDEO_SERVER, SUBSCRIBER_SERVER } from '../../Config';
import ProfileBox from './ProfileBox';
import VideoCard from '../Commons/VideoCard';
import Subscribe from '../Commons/Subscribe';

function ProfilePage(props) {
  const user = useSelector(state => state.user)
  const userId = props.match.params.userId;

  const [UserProfile, setUserProfile] = useState([]);
  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [UserVideos, setUserVideos] = useState([]);

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
          setUserVideos(res.data.videos);
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

  return (
    <div className="w-11/12 flex flex-col justify-center divide-y">
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <ProfileBox userProfile={UserProfile} subscribers={SubscriberNumber} />
          <div className="w-max">
            {user.userData && <Subscribe userTo={userId} userFrom={user} />}
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Uploads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
              {UserVideos && UserVideos.length > 0 ?
                UserVideos.filter(video => (user.userData._id === userId ? true : video.privacy === 1))
                  .map((video, index) => (
                    <VideoCard
                      video={video}
                    />
                  ))
                :
                (
                  <p>no videos!</p>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
