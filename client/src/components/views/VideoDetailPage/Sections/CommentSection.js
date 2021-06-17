import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { COMMENT_SERVER } from '../../../Config';
import Comment from './Comment';

function CommentSection(props) {
  const videoId = props.videoId;
  const user = useSelector(state => state.user);
  const [Comments, setComments] = useState([]);
  const [CommentContent, setCommentContent] = useState("");

  useEffect(() => {
    Axios.post(`${COMMENT_SERVER}/getVideoComments`, { videoId: videoId })
      .then(res => {
        if (res.data.success) {
          setComments(res.data.comments);
        } else {
          alert('코멘트를 불러오지 못했습니다.');
        }
      })
  }, [videoId])

  const handleChange = (event) => {
    setCommentContent(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const variables = {
      videoId: videoId,
      writer: user.userData._id,
      content: CommentContent,
    }

    Axios.post(`${COMMENT_SERVER}/saveComment`, variables)
      .then(res => {
        if (res.data.success) {
          reloadComment(res.data.result);
          setCommentContent("");
        } else {
          alert('코멘트를 저장하지 못했습니다.');
        }
      })
  }

  const reloadComment = (newComment) => {
    setComments(Comments.concat(newComment));
    console.log(newComment);
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="font-medium"> {Comments.length} Comments </p>
      {/* Root Comment Section */}
      <form
        className="w-full bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full h-20 p-2 rounded border text-sm resize-none placeholder-gray-600 focus:outline-none"
          onChange={handleChange}
          value={CommentContent}
          placeholder="Type your comment"
        />
        <br />
        <button
          className="py-1 px-4 border border-gray-400 rounded-lg text-sm tracking-wide hover:bg-gray-100 focus:outline-none"
          onClick={handleSubmit}
          disabled={user.userData.isAuth === false ? true : false}
        > Post Comment </button>
      </form>

      {/* Comment Section */}
      <div className="flex flex-col gap-6">
        {Comments && Comments.map(comment => (
          !comment.pId &&
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
              reloadComment={reloadComment}
              commentList={Comments}
            />
          </React.Fragment>
        ))}
      </div>

    </div >
  )
}

export default CommentSection
