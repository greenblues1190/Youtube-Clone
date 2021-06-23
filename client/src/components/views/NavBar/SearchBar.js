import React from 'react'

function SearchBar() {
  return (
    <form action="/search" method="get" className="w-full max-w-md flex justify-between">
      <label htmlFor="header-search">
        <span className="hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search"
        name="query"
        className="w-full border border-r-0 rounded-l px-2"
      />
      <button
        type="submit"
        className="h-max border rounded-r px-3 sm:px-5 justify-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
