import React from 'react'
import Avatar from '../Commons/Avatar';

function ProfileBox(props) {
  return (
    <div className="flex items-center space-x-6">
      <Avatar imagePath={props.userProfile.image} size="xl" />
      <div className="">
        <p className="block text-2xl">{props.userProfile.name}</p>
        <p className="block text-gray-400">{props.subscribers} subscribers</p>
      </div>
    </div>
  )
}

export default ProfileBox
