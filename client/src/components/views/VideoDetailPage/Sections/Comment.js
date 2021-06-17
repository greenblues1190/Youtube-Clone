import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Avatar from '../../Commons/Avatar';
import moment from 'moment';
import { COMMENT_SERVER } from '../../../Config';

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [ShowReply, setShowReply] = useState(false);
  const [ShowReplyComments, setShowReplyComments] = useState(false);
  const [ReplyContent, setReplyContent] = useState(props.replyContent);
  const [ReplyNumber, setReplyNumber] = useState(0)

  useEffect(() => {
    let replyNumber = 0;
    props.commentList.map(comment => {
      if (comment.pId === props.commentId) {
        replyNumber++;
      }
    })
    setReplyNumber(replyNumber);
  }, [props.commentId, props.commentList])

  const handleClickReplyToggle = (event) => {
    setShowReply(!ShowReply);
  }

  const handleShowReplyCommentsClick = (event) => {
    setShowReplyComments(!ShowReplyComments);
  }

  const handleChange = (event) => {
    setReplyContent(event.currentTarget.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onSubmit(event);
    const variables = {
      videoId: props.videoId,
      writer: user.userData._id,
      pId: props.commentId,
      content: ReplyContent,
    }

    Axios.post(`${COMMENT_SERVER}/saveComment`, variables)
      .then(res => {
        if (res.data.success) {
          props.reloadComment(res.data.result);
          setReplyContent("");
          setShowReply(!ShowReply);
        } else {
          alert('코멘트를 저장하지 못했습니다.');
        }
      })
  }

  let renderReplyComment = () =>
    props.commentList.filter(comment => comment.pId === props.commentId).map((comment, index) => (
      <React.Fragment>
        <Comment
          commentId={comment._id}
          videoId={comment.videoId}
          avatar={comment.writer.image}
          avatarSize="m"
          author={comment.writer.name}
          pId={comment.pId}
          content={comment.content}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
          reloadComment={props.reloadComment}
          commentList={props.commentList}
        />
      </React.Fragment>
    ))


  return (
    <div className="flex flex-row space-x-3 w-full">
      <div className="pt-1">
        <Avatar
          imagePath={props.avatar}
          size={props.avatarSize}
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <p
          className="text-sm font-medium tracking-wide"
        >
          {props.author} <span className="text-xs font-normal text-gray-400">{moment(props.updatedAt).fromNow()}{props.createdAt === props.updatedAt ? "" : ` (editted ${moment(props.updatedAt).fromNow()})`}</span>
        </p>
        <p className="text-sm tracking-wide"> {props.content} </p>

        {/* Reply Comment Form */}
        <div className="flex flex-row gap-2 pt-1 items-center text-gray-400">
          <button
            className="focus:outline-none"
            disabled={user.userData.isAuth === false ? true : false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </button>
          <button
            className="focus:outline-none"
            disabled={user.userData.isAuth === false ? true : false}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
            </svg>
          </button>
          {
            user.userData.isAuth &&
            <button
              className="w-max text-sm focus:outline-none"
              onClick={handleClickReplyToggle}
            >
              Reply
            </button>
          }
        </div>
        {
          user.userData.isAuth && ShowReply &&
          <form
            className="w-full bg-white rounded-lg"
            onSubmit={handleSubmit}
          >
            <textarea
              className="w-full h-20 p-2 rounded border text-sm resize-none placeholder-gray-600 focus:outline-none"
              onChange={handleChange}
              value={ReplyContent}
              placeholder="Type your comment"
            />
            <br />
            <button
              className="py-1 px-4 border border-gray-400 rounded-lg text-sm tracking-wide hover:bg-gray-100 focus:outline-none"
              onClick={handleSubmit}
            > Post Comment </button>
          </form>
        }
        {ReplyNumber > 0 &&
          <button
            className="w-max text-sm text-gray-400 focus:outline-none"
            onClick={handleShowReplyCommentsClick}
          >
            {ShowReplyComments ? "Hide" : "View"} {ReplyNumber} reply(s)
          </button>
        }
        {ReplyNumber > 0 && ShowReplyComments &&
          renderReplyComment()
        }
      </div>
    </div>
  )
}

export default Comment
