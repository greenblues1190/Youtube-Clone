import React, { useEffect, useState } from "react";
import Axios from "axios";
import { VIDEO_SERVER } from "../../Config";

const privacyOptions = [
  { value: false, label: "공개" },
  { value: true, label: "비공개" },
];

const categoryOptions = [
  { value: "멀티미디어", label: "멀티미디어" },
  { value: "음악", label: "음악" },
  { value: "미술", label: "미술" },
  { value: "세미나", label: "세미나" },
];

function VideoEditPage(props) {
  const user = props.user;
  const videoId = props.match.params.videoId;
  const [WriterId, setWriterId] = useState('');
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState(categoryOptions[0].value);
  const [IsPrivate, setIsPrivate] = useState(false);
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const [Submitting, setSubmitting] = useState(false);
  const [IsDeleted, setIsDeleted] = useState(false);

  useEffect(() => {

    Axios.post(`${VIDEO_SERVER}/getVideoDetail`, { videoId: videoId })
      .then(res => {
        if (res.data.success) {
          const videoDetail = res.data.videoDetail;
          setWriterId(videoDetail.writer._id);
          setVideoTitle(videoDetail.title);
          setDescription(videoDetail.description);
          setCategory(videoDetail.category);
          setThumbnailPath(videoDetail.thumbnail);
          setIsPrivate(videoDetail.isPrivate);
          setIsDeleted(videoDetail.IsDeleted);
        } else {
          alert("비디오 정보를 가져오는데 실패했습니다.");
        }
      })
  }, [videoId])

  const handleTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const handleIsPrivateChange = (e) => {
    setIsPrivate(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      videoId: videoId,
      updatedMetadata: {
        title: VideoTitle,
        description: Description,
        isPrivate: IsPrivate,
        category: Category,
      }
    };

    if (window.confirm('비디오 정보를 수정하시겠습니까?')) {
      setSubmitting(true);
      Axios.post(`${VIDEO_SERVER}/updateVideo`, variables)
        .then((response) => {
          if (response.data.success) {
            alert("video updated!");
            setSubmitting(false);
          } else {
            alert("Failed to upload video");
          }
        })
        .catch((error) => {
          alert("error occured!");
          setSubmitting(false);
        });
    }
  };

  const handleDeleteClick = (e) => {
    if (window.confirm('비디오를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      Axios.post(`${VIDEO_SERVER}/deleteVideo`, { videoId: videoId })
        .then((res) => {
          setSubmitting(true);
          if (res.data.success) {
            setIsDeleted(true);
            setSubmitting(false);
            alert('비디오 삭제에 성공했습니다.');
            props.history.push("/");
          } else {
            setSubmitting(false);
            alert('비디오 삭제를 실패했습니다.');
          }
        })
    };
  }

  // waiting to load data
  if (WriterId && user.userData) {
    if (IsDeleted) {
      return (
        <div className="">
          Deleted Video
        </div>
      )
    } else {
      // check authentication
      if (user.userData._id === WriterId) {
        return (
          <div className="max-w-sm mt-10">
            <div className="">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit Video
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you
                  share.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <form action="#" method="POST" onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Thumbnail
                      </label>
                      {/* Thumbnail */}
                      {ThumbnailPath && (
                        <div>
                          <img
                            src={`http://localhost:5000/${ThumbnailPath}`}
                            alt="thumbnail"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleTitleChange}
                        value={VideoTitle}
                        placeholder="title"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                      ></input>
                    </div>
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows="5"
                          onChange={handleDescriptionChange}
                          value={Description}
                          className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="you@example.com"
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your event. URLs are hyperlinked.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 justify-between">
                      <div className="col-span-2 mr-8">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          onChange={handleCategoryChange}
                          className="mt-1 border p-2 w-full rounded-md shadow-sm"
                        >
                          {categoryOptions.map((item, index) => (
                            <option key={index} value={item.value} selected={item.value === Category ? true : false}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="privacy"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Privacy
                        </label>
                        <select
                          onChange={handleIsPrivateChange}
                          className="mt-1 border p-2 w-full rounded-md shadow-sm"
                        >
                          {privacyOptions.map((item, index) => (
                            <option key={index} value={item.value} selected={item.value === IsPrivate ? true : false}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-2">
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={Submitting}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={Submitting}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            forbidden
          </div>
        )
      }
    }
  } else {
    return (
      <div>
        loading...
      </div>
    )
  }
}

export default VideoEditPage;
