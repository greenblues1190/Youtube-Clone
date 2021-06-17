import React from 'react'

function Avatar(props) {
  if (props.size === "l") {
    return (
      <img
        className={`object-cover w-12 h-12 rounded-full`}
        src={props.imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  } else if (props.size === "m") {
    return (
      <img
        className={`object-cover w-8 h-8 rounded-full`}
        src={props.imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  } else if (props.size === "s") {
    return (
      <img
        className={`object-cover w-6 h-6 rounded-full`}
        src={props.imagePath}
        alt="profile users"
        loading="lazy"
      />
    )
  }
}

export default Avatar
