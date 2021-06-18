import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SUBSCRIBER_SERVER } from '../../../Config'

function Subscribe(props) {
  const user = useSelector((state) => state.user)
  const [SubscriberNumber, setSubscriberNumber] = useState(0)
  const [IsSubscribed, setIsSubscribed] = useState(false)
  const [IsMyChannel, setIsMyChannel] = useState(true)
  const [IsLogined, setIsLogined] = useState(false)

  useEffect(() => {
    Axios.post(`${SUBSCRIBER_SERVER}/getSubscriberNumber`, { userTo: props.userTo })
      .then(res => {
        if (res.data.success) {
          setSubscriberNumber(res.data.subscriberNumber)
        } else {
          alert("구독자 수 정보를 받아오지 못했습니다.");
        }
      })

    Axios.post(`${SUBSCRIBER_SERVER}/isSubscribed`, { userTo: props.userTo, userFrom: localStorage.getItem('userId') })
      .then(res => {
        if (res.data.success) {
          setIsSubscribed(res.data.isSubscribed);
        } else {
          alert("구독 정보를 받아오지 못했습니다.");
        }
      })

    // if userTo is userFrom, or not logined, disable the subscribe button
    setIsMyChannel(props.userTo === localStorage.getItem('userId'));
    setIsLogined(user.userData.isAuth ? true : false);
  }, [])

  const onSubscribe = () => {
    let variable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem('userId')
    }
    if (IsSubscribed) {
      // if the channel is already subscribed
      Axios.post(`${SUBSCRIBER_SERVER}/unSubscribe`, variable)
        .then(res => {
          if (res.data.success) {
            setIsSubscribed(false);
            setSubscriberNumber(SubscriberNumber - 1)
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
            setSubscriberNumber(SubscriberNumber + 1)
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
      {SubscriberNumber} {IsSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
    </button>
  )
}

export default Subscribe
