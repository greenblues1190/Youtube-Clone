import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SUBSCRIBER_SERVER } from '../../Config'; 

function Subscribe(props) {
  const [IsSubscribed, setIsSubscribed] = useState(false)
  const [IsMyChannel, setIsMyChannel] = useState(true)
  const [IsLogined, setIsLogined] = useState(false)

  useEffect(() => {
    Axios.post(`${SUBSCRIBER_SERVER}/isSubscribed`, { userTo: props.userTo, userFrom: props.userFrom.userData._id })
      .then(res => {
        if (res.data.success) {
          setIsSubscribed(res.data.isSubscribed);
        } else {
          alert("구독 정보를 받아오지 못했습니다.");
        }
      })

    // if userTo is userFrom, or not logined, disable the subscribe button
    setIsMyChannel(props.userTo === props.userFrom.userData._id);
    setIsLogined(props.userFrom.userData.isAuth ? true : false);
  }, [props.userFrom.userData._id, props.userFrom.userData.isAuth, props.userTo])

  const onSubscribe = () => {
    let variable = {
      userTo: props.userTo,
      userFrom: props.userFrom.userData._id
    }
    if (IsSubscribed) {
      // if the channel is already subscribed
      Axios.post(`${SUBSCRIBER_SERVER}/unSubscribe`, variable)
        .then(res => {
          if (res.data.success) {
            setIsSubscribed(false);
          } else {
            alert("구독 해지를 실패했습니다.");
          }
        })
    } else {
      // if the channel is not subscribed
      Axios.post(`${SUBSCRIBER_SERVER}/subscribe`, variable)
        .then(res => {
          if (res.data.success) {
            setIsSubscribed(true);
          } else {
            alert("구독을 실패했습니다.");
          }
        })
    }
  }

  return (
    <button
      className={`${IsSubscribed ? "bg-blue-800 border-blue-900 " : "bg-blue-700 border-blue-800 "}w-max text-sm rounded px-3 py-2 m-1 border-b-4 shadow-lg text-white disabled:opacity-50`}
      onClick={onSubscribe}
      disabled={IsMyChannel || !IsLogined}
    >
      {IsSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
    </button>
  )
}

export default Subscribe
