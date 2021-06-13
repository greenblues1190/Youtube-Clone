import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { VIDEO_SERVER } from "../../Config";
import VideoCard from "../Commons/VideoCard";

function LandingPage() {
    const [Video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get(`${VIDEO_SERVER}/getVideos`)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data);
                    setVideo(res.data.videos);
                } else {
                    alert('비디오 가져오기를 실패하였습니다.');
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {
        return (
            <VideoCard
                video={video}
            />
        )

        // return <div className="relative">
        //     <a href={`/video/post/${video._id}`} >
        //         <img className="w-full" src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
        //         <div className="duration">
        //             <span>{minutes} : {seconds}</span>
        //         </div>
        //     </a>
        //     <br />
        //     <Meta
        //         avatar={
        //             <Avatar src={video.writer.image} />
        //         }
        //         title={video.title}
        //     />
        //     < span > {video.writer.name} </span><br />
        //     <span className="mx-12"> {video.views} views</span> - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        // </div>
    })

    return (
        <div className="w-11/12 flex flex-col justify-center divide-y pb-12">
            <div className="mt-4">
                <div className="text-3xl m-2">Recommended</div>

                <div className="grid sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
                    {renderCards}
                </div>
            </div>
        </div>
    )
}

export default LandingPage
