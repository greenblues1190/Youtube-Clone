import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { LIKE_SERVER } from '../../Config';

function LikeDisLikeButton(props) {
  const user = useSelector((state) => state.user);
  const [LikeNumber, setLikeNumber] = useState(0);
  const [DislikeNumber, setDislikeNumber] = useState(0);
  const [IsLikeClicked, setIsLikeClicked] = useState(false);
  const [IsDislikeClicked, setIsDislikeClicked] = useState(false);
  const textSize = "text-xs";
  const iconSize = "w-4 h-4";

  useEffect(() => {
    let variables = {
      type: props.type,
      objectId: props.objectId,
      userId: props.user.userData._id
    }

    Axios.post(`${LIKE_SERVER}/getLikes`, variables)
      .then((res) => {
        if (res.data.success) {
          // success to load like data
          setLikeNumber(res.data.likes.length);

          res.data.likes.forEach(like => {
            if (props.user.userData._id && like.userId === props.user.userData._id) {
              setIsLikeClicked(true);
            }
          })
        } else {
          alert("좋아요 정보를 불러오는데 실패했습니다.");
        }
      })

    Axios.post(`${LIKE_SERVER}/getDislikes`, variables)
      .then((res) => {
        if (res.data.success) {
          // success to load dislike data
          setDislikeNumber(res.data.dislikes.length);

          res.data.dislikes.forEach(dislike => {
            if (props.user.userData._id && dislike.userId === props.user.userData._id) {
              setIsDislikeClicked(true);
            }
          })
        } else {
          alert("싫어요 정보를 불러오는데 실패했습니다.");
        }
      })
  }, [props.objectId, props.type, props.user.userData])

  const handleLikeClick = (event) => {
    let variables = {
      type: props.type,
      objectId: props.objectId,
      userId: props.user.userData._id
    }

    if (IsLikeClicked) {
      Axios.post(`${LIKE_SERVER}/unLike`, variables)
        .then((res) => {
          if (res.data.success) {
            setLikeNumber(LikeNumber - 1);
            setIsLikeClicked(!IsLikeClicked);
          } else {
            console.error(res)
          }
        })
    } else {
      if (IsDislikeClicked) {
        Axios.post(`${LIKE_SERVER}/unDislike`, variables)
          .then((res) => {
            if (res.data.success) {
              setIsDislikeClicked(false);
              setDislikeNumber(DislikeNumber - 1);
            } else {
            console.error(res)
          }
          })
      }
      Axios.post(`${LIKE_SERVER}/like`, variables)
        .then((res) => {
          if (res.data.success) {
            setLikeNumber(LikeNumber + 1);
            setIsLikeClicked(!IsLikeClicked);
          } else {
            console.error(res)
          }
        })
    }
  }

  const handleDislikeClick = (event) => {
    let variables = {
      type: props.type,
      objectId: props.objectId,
      userId: props.user.userData._id
    }

    if (IsDislikeClicked) {
      Axios.post(`${LIKE_SERVER}/unDislike`, variables)
        .then((res) => {
          if (res.data.success) {
            setDislikeNumber(DislikeNumber - 1);
            setIsDislikeClicked(!IsDislikeClicked);
          } else {
            console.error(res)
          }
        })
    } else {
      if (IsLikeClicked) {
        Axios.post(`${LIKE_SERVER}/unLike`, variables)
          .then((res) => {
            if (res.data.success) {
              setIsLikeClicked(false);
              setLikeNumber(LikeNumber - 1);
            } else {
              console.error(res)
            }
          })
      }
      Axios.post(`${LIKE_SERVER}/dislike`, variables)
        .then((res) => {
          if (res.data.success) {
            setDislikeNumber(DislikeNumber + 1);
            setIsDislikeClicked(!IsDislikeClicked);
          } else {
            console.error(res)
          }
        })
    }
  }

  return (
    <div className={`flex flex-row gap-2 items-center text-gray-400 ${textSize}`}>
      {/* like */}
      <div className="flex flex-row gap-1 items-center">
        <button
          className={`focus:outline-none ${IsLikeClicked ? "text-gray-700" : "text-gray-400"}`}
          onClick={handleLikeClick}
          disabled={user.userData.isAuth === false ? true : false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        </button>
        <p> {LikeNumber} </p>
      </div>
      {/* dislike */}
      <div className="flex flex-row gap-1 items-center">
        <button
          className={`focus:outline-none ${IsDislikeClicked ? "text-gray-700" : "text-gray-400"}`}
          onClick={handleDislikeClick}
          disabled={user.userData.isAuth === false ? true : false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
          </svg>
        </button>
        <p> {DislikeNumber} </p>
      </div>
    </div>
  )
}

export default LikeDisLikeButton
