import React, { useState } from "react";
import Dropzone from "react-dropzone";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import Axios from "axios";
registerLocale("ko", ko);

const privateOptions = [
  { value: 0, label: "비공개" },
  { value: 1, label: "공개" },
];

const categoryOptions = [
  { value: 0, label: "멀티미디어" },
  { value: 1, label: "음악" },
  { value: 2, label: "미술" },
  { value: 3, label: "세미나" },
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Website, setWebsite] = useState("");
  const [Description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [Category, setCategory] = useState(categoryOptions[0]);
  const [Private, setPrivate] = useState(0);

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onWebsiteChange = (e) => {
    setWebsite(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onDateChange = (date) => {
    setEventDate(date);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onDropCover = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    console.log("file", files);


    Axios.post('api/video/uploadfiles', formData, config)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
      alert("비디오 업로드 실패");
    })
  };

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  // 월/일
  const getFormattedDate = (date) => {
    const month = date.toLocaleDateString("ko-KR", {
      month: "long",
    });

    const day = date.toLocaleDateString("ko-KR", {
      day: "numeric",
    });

    return `${month.substr(0, month.length - 1)}/${day.substr(
      0,
      day.length - 1
    )}`;
  };

  // 요일 반환
  const getDayName = (date) => {
    return date
      .toLocaleDateString("ko-KR", {
        weekday: "long",
      })
      .substr(0, 1);
  };

  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  return (
    <div className="max-w-sm mt-10">
      <div className="">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upload Video
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <form action="#" method="POST" onSubmit>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="">
                <label
                  for="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={onTitleChange}
                  value={VideoTitle}
                  placeholder="title"
                  className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                ></input>
              </div>
              <div className="">
                <label
                  for="company_website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center py-2 px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    http://
                  </span>
                  <input
                    type="text"
                    name="company_website"
                    id="company_website"
                    onChange={onWebsiteChange}
                    value={Website}
                    className="pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300"
                    placeholder="www.example.com"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  for="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows="5"
                    onChange={onDescriptionChange}
                    value={Description}
                    className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  ></textarea>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your event. URLs are hyperlinked.
                </p>
              </div>
              <div className="">
                <label
                  for="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <DatePicker
                  locale="ko"
                  className="py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  showTimeSelect
                  minDate={new Date()}
                  selected={eventDate}
                  onChange={onDateChange}
                  dateFormat="yyyy.MM.dd(eee)"
                  timeClassName={handleColor}
                  popperModifiers={{
                    // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                    preventOverflow: {
                      enabled: true,
                    },
                  }}
                  popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
                  // 토요일, 일요일 색깔 바꾸기 위함
                  dayClassName={(date) =>
                    getDayName(createDate(date)) === "토"
                      ? "saturday"
                      : getDayName(createDate(date)) === "일"
                      ? "sunday"
                      : undefined
                  }
                />
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your event. URLs are hyperlinked.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  커버
                </label>
                <Dropzone
                  onDrop={onDropCover}
                  multiple={false}
                  maxSize={10}
                  acceptedFiles=".jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF"
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
                            for="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              {...getInputProps()}
                            ></input>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="grid grid-cols-3 justify-between">
                <div className="col-span-2 mr-8">
                  <label
                    for="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    카테고리
                  </label>
                  <select
                    onChange={onCategoryChange}
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
                    for="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    공개 범위
                  </label>
                  <select
                    onChange={onPrivateChange}
                    className="mt-1 border p-2 w-full border rounded-md shadow-sm"
                  >
                    {privateOptions.map((item, index) => (
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
                onSubmit
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
