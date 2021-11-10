import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { VIDEO_SERVER } from '../../Config';

const privacyOptions = [
  { value: false, label: '공개' },
  { value: true, label: '비공개' },
];

const categoryOptions = [
  { value: '멀티미디어', label: '멀티미디어' },
  { value: '애니메이션', label: '애니메이션' },
  { value: '음악', label: '음악' },
  { value: '미술', label: '미술' },
  { value: '교육', label: '교육' },
  { value: '생활', label: '생활' },
  { value: '음식', label: '음식' },
];

// max file size (MB)
const maxFileSize = 10;

function VideoUploadPage(props) {
  const user = props.user;
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState(categoryOptions[0].value);
  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');
  const [IsPrivate, setIsPrivate] = useState(false);

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

  const handleDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    Axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          let variable = {
            url: response.data.url,
            fileName: response.data.fileName,
          };

          setFilePath(response.data.url);

          Axios.post(`${VIDEO_SERVER}/thumbnail`, variable).then((response) => {
            if (response.data.success) {
              setDuration(response.data.fileDuration);
              setThumbnailPath(response.data.url);
              console.log(response.data.url);
            } else {
              alert('failed to create thumbnail');
            }
          });
        } else {
          alert('failed to save the video in server.');
        }
      })
      .catch((error) => {
        alert('failed to save the video in server.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
      isPrivate: IsPrivate,
    };

    Axios.post(`${VIDEO_SERVER}/uploadVideo`, variables)
      .then((response) => {
        if (response.data.success) {
          alert('video uploaded!');
          props.history.push('/');
        } else {
          alert('Failed to upload video');
        }
      })
      .catch((error) => {
        alert('error occured!');
      });
  };

  return (
    <div className="max-w-sm mt-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Upload Video
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div className="mt-5">
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <Dropzone
                  onDrop={handleDrop}
                  multiple={false}
                  maxSize={maxFileSize * 1000000} // Maximum file size (in bytes)
                  // acceptedFiles=".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      {...getRootProps()}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input {...getInputProps()}></input>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to {maxFileSize}MB
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
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
                      <option key={index} value={item.value}>
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
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUploadPage;
