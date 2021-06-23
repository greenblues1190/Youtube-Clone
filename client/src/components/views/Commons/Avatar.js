import React from 'react'

function Avatar({imagePath, size}) {
  if (size === "xl") {
    return (
      <img
        className={`object-cover w-20 h-20 rounded-full`}
        src={imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  } else if (size === "l") {
    return (
      <img
        className={`object-cover w-12 h-12 rounded-full`}
        src={imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  } else if (size === "m") {
    return (
      <img
        className={`object-cover w-8 h-8 rounded-full`}
        src={imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  } else if (size === "s") {
    return (
      <img
        className={`object-cover w-6 h-6 rounded-full`}
        src={imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  }
}

export default Avatar
