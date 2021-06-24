import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { VIDEO_SERVER } from "../../Config";
import VideoCard from "../Commons/VideoCard";

function SubscriptionPage(props) {
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        Axios.post(`${VIDEO_SERVER}/getSubscribedVideos`, { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if (res.data.success) {
                    setVideo(res.data.videos);
                } else {
                    alert('구독한 비디오 가져오기를 실패하였습니다.');
                }
            })
    }, [props.user.userData])

    const renderCards = Video.map(video => {
        if (!video.isPrivate && !video.isDeleted) {
            return (
                <VideoCard
                    video={video}
                />
            )
        } else {
            return null
        }
    })

    return (
        <div className="w-11/12 flex flex-col justify-center divide-y">
            <div className="mt-4">
                <p className="text-3xl mb-4">Subscription</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
                    {renderCards}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage
