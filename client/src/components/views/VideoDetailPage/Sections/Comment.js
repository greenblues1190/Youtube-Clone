import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Avatar from '../../Commons/Avatar';
import moment from 'moment';
import { COMMENT_SERVER } from '../../../Config';
import LikeDislikeButton from '../../Commons/LikeDislikeButton';

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [ShowReply, setShowReply] = useState(false);
  const [ShowReplyComments, setShowReplyComments] = useState(false);
  const [ReplyContent, setReplyContent] = useState(props.replyContent);
  const [ReplyNumber, setReplyNumber] = useState(0)

  useEffect(() => {
    let replyNumber = 0;
    props.commentList.forEach(comment => {
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
          userId={comment.writer._id}
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
        <Link to={`/profile/${props.userId}`}>
          <Avatar
            imagePath={props.avatar}
            size={props.avatarSize}
          />
        </Link>
      </div>

      <div className="w-full flex flex-col gap-1">
        <p
          className="text-sm font-medium tracking-wide"
        >
          <Link to={`/profile/${props.userId}`}>{props.author}</Link> <span className="text-xs font-normal text-gray-400">{moment(props.updatedAt).fromNow()}{props.createdAt === props.updatedAt ? "" : ` (editted ${moment(props.updatedAt).fromNow()})`}</span>
        </p>
        <p className="text-sm tracking-wide"> {props.content} </p>

        {/* Reply Comment Form */}
        <div className="flex flex-row gap-2 pt-1 items-center text-gray-400">
          <LikeDislikeButton type="comment" objectId={props.commentId} user={user} size="xs" />
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
