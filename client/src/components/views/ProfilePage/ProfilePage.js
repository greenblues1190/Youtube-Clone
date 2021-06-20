import React from 'react'
// import { useSelector } from 'react-redux'

function ProfilePage(props) {
  const userId = props.match.params.userId;

  return (
    <div>
      Profile of {userId}
    </div>
  )
}

export default ProfilePage
