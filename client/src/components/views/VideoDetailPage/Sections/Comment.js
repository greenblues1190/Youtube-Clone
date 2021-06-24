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
  const [CommentContent, setCommentContent] = useState(props.comment.content)
  const [ShowReply, setShowReply] = useState(false);
  const [ShowReplyComments, setShowReplyComments] = useState(false);
  const [ReplyContent, setReplyContent] = useState(props.replyContent);
  const [ReplyNumber, setReplyNumber] = useState(0)
  const [IsEditting, setIsEditting] = useState(false);
  const [IsDeleted, setIsDeleted] = useState(props.comment.isDeleted);
  const [EditTextareaContent, setEditTextareaContent] = useState(CommentContent);

  useEffect(() => {
    let replyNumber = 0;
    props.commentList.forEach(comment => {
      if (comment.pId === props.comment._id) {
        replyNumber++;
      }
    })
    setReplyNumber(replyNumber);
  }, [props.comment._id, props.commentList])

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
      videoId: props.comment.videoId,
      writer: user.userData._id,
      pId: props.comment._id,
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

  const handleEditToggle = (event) => {
    setEditTextareaContent(CommentContent)
    setIsEditting(!IsEditting);
  }

  const handleEditTextareaChange = (event) => {
    setEditTextareaContent(event.currentTarget.value);
  }

  const handleEditTextareaSubmit = (event) => {
    event.preventDefault();

    const variables = {
      commentId: props.comment._id,
      updatedComment: {
        content: EditTextareaContent
      }
    }

    Axios.post(`${COMMENT_SERVER}/updateComment`, variables)
      .then((res) => {
        if (res.data.success) {
          setCommentContent(EditTextareaContent);
          setIsEditting(!IsEditting);
        } else {
          alert('댓글 수정을 실패했습니다.');
        }
      })
  }

  const handleDeleteClick = (event) => {
    if (window.confirm('댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      Axios.post(`${COMMENT_SERVER}/deleteComment`, { commentId: props.comment._id })
        .then((res) => {
          if (res.data.success) {
            setIsDeleted(true);
            setIsEditting(false);
            alert('댓글을 삭제하였습니다.');
          } else {
            alert('댓글 삭제를 실패했습니다.');
          }
        })
    }
  }

  let renderReplyComment = () =>
    props.commentList.filter(comment => comment.pId === props.comment._id).map((comment, index) => (
      <React.Fragment>
        <Comment
          comment={comment}
          reloadComment={props.reloadComment}
          commentList={props.commentList}
        />
      </React.Fragment>
    ))


  return (
    <div className="flex flex-row space-x-3 w-full">
      <div className="pt-1">
        <Link to={`/profile/${props.comment.writer._id}`}>
          <Avatar
            imagePath={props.comment.writer.image}
            size='m'
          />
        </Link>
      </div>

      <div className="w-full flex flex-col gap-1">
        <div>
          <p className="text-sm font-medium tracking-wide">
            <Link to={`/profile/${props.comment.writer._id}`}>
              {props.comment.writer.name}
            </Link>
            <span className=" pl-1.5 text-xs font-normal text-gray-400">
              {moment(props.comment.createdAt).fromNow()}
              {
                props.comment.createdAt === props.comment.updatedAt ?
                  ""
                  :
                  ` (editted ${moment(props.comment.updatedAt).fromNow()})`
              }
            </span>
          </p>
        </div>
        {IsEditting ?
          <form
            className="w-full bg-white rounded-lg"
            onSubmit={handleEditTextareaSubmit}
          >
            <textarea
              className="w-full h-20 p-2 rounded border text-sm resize-none placeholder-gray-600 focus:outline-none"
              onChange={handleEditTextareaChange}
              value={EditTextareaContent}
              placeholder="Type your comment"
              disabled={IsDeleted}
            />
            <button
              className="py-1 px-4 border border-gray-400 rounded-lg text-sm tracking-wide hover:bg-gray-100 focus:outline-none"
              onSubmit={handleEditTextareaSubmit}
              disabled={IsDeleted}
            > Save </button>
          </form>
          :
          (IsDeleted ?
            <p className="text-sm tracking-wide text-gray-500"> [Deleted] </p>
            :
            <p className="text-sm tracking-wide"> {CommentContent} </p>
          )
        }

        {/* Reply Comment Form */}
        <div className="flex flex-row gap-2 pt-1 items-center text-gray-400">
          <LikeDislikeButton
            type="comment"
            objectId={props.comment._id}
            user={user}
            size="xs"
            disabled={IsDeleted}
          />
          {
            props.comment.writer._id === user.userData._id && !IsDeleted &&
            <button
              className="w-max text-sm focus:outline-none"
              onClick={handleEditToggle}
              disabled={IsDeleted}
            >
              {IsEditting ? "Cancel" : "Edit"}
            </button>
          }
          {
            props.comment.writer._id === user.userData._id && !IsDeleted &&
            <button
              className="w-max text-sm focus:outline-none"
              onClick={handleDeleteClick}
              disabled={IsDeleted}
            >
              Delete
            </button>
          }
          {
            user.userData.isAuth && !IsDeleted &&
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
              disabled={IsDeleted}
            />
            <br />
            <button
              className="py-1 px-4 border border-gray-400 rounded-lg text-sm tracking-wide hover:bg-gray-100 focus:outline-none"
              onSubmit={handleSubmit}
              disabled={IsDeleted}
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
